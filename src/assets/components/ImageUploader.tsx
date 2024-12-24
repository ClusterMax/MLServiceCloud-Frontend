import React, { useState } from 'react';
import { Upload, Card, Button, Spin, Alert, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const { Dragger } = Upload;

const ImageUploader: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (fileList.length === 0) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', fileList[0].originFileObj as Blob); // Cambia 'image' por 'file'

    try {
      const response = await axios.post('http://localhost:8000/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${API_KEY}`,  // Usar la API Key en el encabezado
        },
      });

      // Extrae la clase predicha del backend
      const predictedClass = response.data.class;
      setResult(`Predicted class: ${predictedClass}`);
    } catch (err) {
      setError('Error processing the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        setError('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
      setError(null);
      setResult(null);
    },
    maxCount: 1,
  };

  const reset = () => {
    setFileList([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <Dragger {...uploadProps} className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-dashed border-purple-200 rounded-lg">
          <p className="ant-upload-drag-icon">
            <InboxOutlined className="text-blue-500" />
          </p>
          <p className="ant-upload-text text-lg">Click or drag an image to this area</p>
          <p className="ant-upload-hint text-gray-500">
            Support for single image upload. Please upload a clear image for better classification results.
          </p>
        </Dragger>

        {fileList.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-center mb-4">
              <Image
                src={URL.createObjectURL(fileList[0].originFileObj as Blob)}
                alt="Preview"
                className="rounded-lg"
                style={{ maxHeight: '300px' }}
              />
            </div>
            <Button
              type="primary"
              onClick={handleUpload}
              loading={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 border-0 hover:from-purple-700 hover:to-blue-700"
            >
              Classify Image
            </Button>
          </div>
        )}

        {loading && (
          <div className="mt-6 text-center">
            <Spin size="large" />
            <p className="mt-2 text-gray-600">Processing your image...</p>
          </div>
        )}

        {result && (
          <div className="mt-6">
            <Alert
              message="Classification Result"
              description={result}
              type="success"
              showIcon
              action={
                <Button onClick={reset} size="small">
                  Upload Another
                </Button>
              }
            />
          </div>
        )}

        {error && (
          <div className="mt-6">
            <Alert message={error} type="error" showIcon closable />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImageUploader;
