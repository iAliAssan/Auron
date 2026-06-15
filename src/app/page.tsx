export default function HomePage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0A0A0F',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>AURON</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>در حال راه‌اندازی...</p>
        <p style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.5 }}>صفحه تست Supabase در <a href="/test-supabase" style={{color: '#9CB080'}}>/test-supabase</a></p>
      </div>
    </div>
  );
}
