
import { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PhotoCaptureProps {
  onPhotoSelected: (photo: File | null) => void;
  selectedPhoto?: File | null;
}

const PhotoCapture = ({ onPhotoSelected, selectedPhoto }: PhotoCaptureProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onPhotoSelected(file);
    }
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const clearPhoto = () => {
    setPreview(null);
    onPhotoSelected(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        className="hidden"
      />
      
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        className="hidden"
      />

      {!preview ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-semibold text-gray-700 mb-2">Add Proof Photo (Optional)</h4>
          <p className="text-gray-500 text-sm mb-4">
            Take a photo of your medication or pill organizer as confirmation
          </p>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleCameraCapture}
              variant="outline"
              className="mx-auto"
            >
              <Camera className="w-4 h-4 mr-2" />
              Take Photo
            </Button>
            <Button
              onClick={handleFileUpload}
              variant="outline"
              className="mx-auto"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload from Device
            </Button>
          </div>
        </div>
      ) : (
        <Card className="p-4">
          <div className="relative">
            <img
              src={preview}
              alt="Medication proof"
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button
              onClick={clearPhoto}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Photo selected: {selectedPhoto?.name || 'Unknown file'}
          </p>
          <div className="flex items-center justify-center mt-2 text-green-600">
            <Check className="w-4 h-4 mr-1" />
            <span className="text-sm">Photo ready to upload</span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PhotoCapture;
