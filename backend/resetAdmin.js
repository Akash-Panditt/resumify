require('dotenv').config();
const bcrypt = require('bcryptjs');
const supabase = require('./supabase');

async function resetAdmin() {
  const email = 'akashpandit8436@gmail.com';
  const password = 'Qwerty@123456';
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  console.log('Hashed password generated');
  
  // Check if user exists
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    // Update existing user
    const { data, error } = await supabase
      .from('users')
      .update({ password: hashedPassword, role: 'admin' })
      .eq('email', email)
      .select('id, name, email, role')
      .single();
    
    if (error) { console.error('Error:', error.message); process.exit(1); }
    console.log('Admin account UPDATED:', data);
  } else {
    // Create new admin user
    const { data, error } = await supabase
      .from('users')
      .insert([{ name: 'Admin', email, password: hashedPassword, role: 'admin' }])
      .select('id, name, email, role')
      .single();
    
    if (error) { console.error('Error:', error.message); process.exit(1); }
    console.log('Admin account CREATED:', data);
  }
  
  console.log('\nAdmin credentials:');
  console.log('Email:', email);
  console.log('Password: Qwerty@123456');
  console.log('\nLogin at: http://localhost:5173/admin/login');
  process.exit(0);
}

resetAdmin();
