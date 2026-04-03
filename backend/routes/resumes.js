const express = require('express');
const supabase = require('../supabase');
const { protect } = require('../middleware/auth');

const router = express.Router();

const mapResumeFields = (resume) => {
  if (!resume) return null;
  return {
    ...resume,
    _id: resume.id,
    user: resume.user_id,
    personalDetails: resume.personal_details,
    createdAt: resume.created_at,
    updatedAt: resume.updated_at
  };
};

const mapPayloadToColumns = (body) => {
  const payload = { ...body };
  if (payload.personalDetails) {
    payload.personal_details = payload.personalDetails;
    delete payload.personalDetails;
  }
  delete payload._id;
  delete payload.id;
  delete payload.user;
  delete payload.user_id;
  delete payload.createdAt;
  delete payload.updatedAt;
  delete payload.created_at;
  delete payload.updated_at;
  
  return payload;
};

// Create resume — accepts optional template field
router.post('/', protect, async (req, res) => {
  try {
    const template = req.body.template || 'modern';
    const { data: resume, error } = await supabase
      .from('resumes')
      .insert([{ user_id: req.user.id, template }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(mapResumeFields(resume));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download tracking — enforces plan limits
router.post('/download/:id', protect, async (req, res) => {
  try {
    // Get user's current plan and download count
    const { data: user, error: uErr } = await supabase
      .from('users')
      .select('plan, download_count')
      .eq('id', req.user.id)
      .maybeSingle();

    if (uErr || !user) throw new Error('User not found');

    const limits = { free: 3, premium: 50, enterprise: Infinity };
    const maxDownloads = limits[user.plan] || 3;

    if (user.download_count >= maxDownloads) {
      return res.status(403).json({
        message: `Download limit reached for ${user.plan} plan. Upgrade to get more downloads.`,
        limit: maxDownloads,
        used: user.download_count,
        plan: user.plan
      });
    }

    // Verify the resume belongs to this user
    const { data: resume, error: rErr } = await supabase
      .from('resumes')
      .select('id')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (rErr || !resume) return res.status(404).json({ message: 'Resume not found' });

    // Increment download count
    const { data: updatedUser, error: updateErr } = await supabase
      .from('users')
      .update({ download_count: user.download_count + 1 })
      .eq('id', req.user.id)
      .select('download_count, plan')
      .single();

    if (updateErr) throw updateErr;

    res.json({
      allowed: true,
      download_count: updatedUser.download_count,
      limit: maxDownloads,
      plan: updatedUser.plan
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const { data: resumes, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', req.user.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    res.json(resumes.map(mapResumeFields));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const { data: resume, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (error) throw error;
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    
    res.json(mapResumeFields(resume));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const updatePayload = mapPayloadToColumns(req.body);
    updatePayload.updated_at = new Date().toISOString();
    
    const { data: resume, error } = await supabase
      .from('resumes')
      .update(updatePayload)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    
    res.json(mapResumeFields(resume));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const { data: resume, error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .maybeSingle();

    if (error) throw error;
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    
    res.json({ message: 'Resume removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
