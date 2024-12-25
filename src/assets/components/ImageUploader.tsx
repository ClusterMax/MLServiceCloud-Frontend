import React, { useState } from 'react';
import { Upload, Card, Button, Spin, Alert, Image } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

const { Dragger } = Upload;

interface PredictionResult {
  predicted_class_name: string;
  predicted_class_probability: number;
}

const ImageUploader: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (fileList.length === 0) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', fileList[0].originFileObj as Blob);

    try {
      const response = await axios.post('/api/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': API_KEY,
        },
      });

      console.log('Response data:', response.data);
      const { predicted_class_name, probability } = response.data;

      // Reorganizar los resultados
      const sortedResults: PredictionResult = {
        predicted_class_name,
        predicted_class_probability: probability,
      };

      setResult(sortedResults);
    } catch (err: any) {
      console.error('Error details:', err.response?.data || err.message);
      setError(err.response?.data?.detail || 'Error processing the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type === 'image/png' || file.type === 'image/jpeg';
      if (!isImage) {
        setError('Only PNG and JPG image files are allowed!');
        return Upload.LIST_IGNORE;
      }
      return false; // Allow the upload if the file type is correct
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
      setError(null); // Clear previous errors
      setResult(null); // Clear previous results
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
              description={
                <div>
                  <p><strong>Predicted Class:</strong> {result.predicted_class_name}</p>
                  <p><strong>Confidence:</strong> {(result.predicted_class_probability * 100).toFixed(2)}%</p>
                </div>
              }
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
