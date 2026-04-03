const express = require('express');
const supabase = require('../supabase');
const { protect, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/admin/stats — Dashboard overview stats
router.get('/stats', protect, requireAdmin, async (req, res) => {
  try {
    const { data: users, error: uErr } = await supabase.from('users').select('id, plan, role');
    if (uErr) throw uErr;

    const { count: resumeCount, error: rErr } = await supabase.from('resumes').select('id', { count: 'exact', head: true });
    if (rErr) throw rErr;

    const planDistribution = { free: 0, premium: 0, enterprise: 0 };
    users.forEach(u => { if (planDistribution[u.plan] !== undefined) planDistribution[u.plan]++; });

    res.json({
      totalUsers: users.length,
      totalResumes: resumeCount || 0,
      totalAdmins: users.filter(u => u.role === 'admin').length,
      planDistribution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/users — List all users
router.get('/users', protect, requireAdmin, async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, plan, role, download_count, requested_plan, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/admin/users/:id — Update user plan or role
router.put('/users/:id', protect, requireAdmin, async (req, res) => {
  try {
    const { plan, role } = req.body;
    const updatePayload = {};
    if (plan) updatePayload.plan = plan;
    if (role) updatePayload.role = role;
    updatePayload.updated_at = new Date().toISOString();

    const { data: user, error } = await supabase
      .from('users')
      .update(updatePayload)
      .eq('id', req.params.id)
      .select('id, name, email, plan, role, download_count, created_at, updated_at')
      .single();

    if (error) throw error;
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/admin/users/:id — Delete user (cascades resumes)
router.delete('/users/:id', protect, requireAdmin, async (req, res) => {
  try {
    // Prevent self-deletion
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'User and their resumes deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/resumes — List all resumes
router.get('/resumes', protect, requireAdmin, async (req, res) => {
  try {
    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('id, user_id, title, template, created_at, updated_at')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/admin/resumes/:id — Delete any resume
router.delete('/resumes/:id', protect, requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/approve-upgrade/:id — Move requested_plan to plan
router.post('/approve-upgrade/:id', protect, requireAdmin, async (req, res) => {
  try {
    const { data: user, error: fetchErr } = await supabase
      .from('users')
      .select('requested_plan')
      .eq('id', req.params.id)
      .single();
    
    if (fetchErr || !user.requested_plan) {
      return res.status(400).json({ message: 'No pending upgrade request found' });
    }

    const { error: updateErr } = await supabase
      .from('users')
      .update({ 
        plan: user.requested_plan, 
        requested_plan: null,
        updated_at: new Date().toISOString() 
      })
      .eq('id', req.params.id);

    if (updateErr) throw updateErr;
    res.json({ message: `Successfully upgraded user to ${user.requested_plan}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/reject-upgrade/:id — Clear requested_plan
router.post('/reject-upgrade/:id', protect, requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from('users')
      .update({ requested_plan: null, updated_at: new Date().toISOString() })
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Upgrade request rejected' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
