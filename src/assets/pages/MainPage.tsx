import { ConfigProvider } from 'antd';
import Header from '../components/Header';
import ImageUploader from '../components/ImageUploader';
import Footer from '../components/Footer';

function MainPage() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 8,
        },
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 pb-16 px-4">
          <ImageUploader />
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default MainPage;
