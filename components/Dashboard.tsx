import React, { useState, useRef, useEffect } from 'react';
import { Icons } from './Icons';
import { UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'settings' | 'upload'>('overview');
  
  // User State (Local)
  const [profile, setProfile] = useState<UserProfile>(user);

  // Update local state if prop changes
  useEffect(() => {
    setProfile(user);
  }, [user]);

  // Upload State
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    bankName: profile.bankName,
    accountNumber: profile.accountNumber
  });

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettingsForm(prev => ({ ...prev, [name]: value }));
  };

  const saveSettings = () => {
    setProfile(prev => ({
      ...prev,
      ...settingsForm
    }));
    alert("Profile settings saved successfully!");
  };

  // Upload Handlers
  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please upload a valid image file (JPG, PNG).';
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
      return 'File size exceeds 5MB limit.';
    }
    return null;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const error = validateFile(file);
      if (error) {
        setUploadError(error);
        return;
      }
      setUploadError(null);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const error = validateFile(file);
      if (error) {
        setUploadError(error);
        return;
      }
      setUploadError(null);
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      alert("Photo uploaded successfully!");
      
      // Mock adding photo to profile
      const newPhoto = {
        id: Date.now(),
        url: previewUrl || '',
        price: '500 ETB',
        status: 'Active' as const,
        date: 'Just now',
        title: 'New Upload'
      };
      
      setProfile(prev => ({
        ...prev,
        photos: [newPhoto, ...prev.photos]
      }));

      setActiveTab('photos');
      clearFile();
    }, 2000);
  };

  const stats = [
    { label: 'Total Earnings', value: profile.stats.earnings, icon: 'DollarSign', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Photos Sold', value: profile.stats.photosSold.toString(), icon: 'ShoppingBag', color: 'text-brand-600', bg: 'bg-brand-50' },
    { label: 'Profile Views', value: profile.stats.views.toString(), icon: 'Eye', color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-500">Welcome back, @{profile.username}</p>
          </div>
          <div className="flex gap-3">
             <button 
               onClick={() => setActiveTab('upload')}
               className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
             >
                <Icons.Plus className="w-4 h-4" /> Upload New Photo
             </button>
             <button 
                onClick={onLogout}
                className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-4 py-2 rounded-lg transition-colors"
             >
                <Icons.LogOut className="w-4 h-4" /> Logout
             </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <nav className="flex flex-col">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-4 ${activeTab === 'overview' ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icons.LayoutDashboard className="w-5 h-5" /> Overview
                </button>
                <button 
                  onClick={() => setActiveTab('photos')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-4 ${activeTab === 'photos' ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icons.ImageIcon className="w-5 h-5" /> My Photos
                </button>
                <button 
                  onClick={() => setActiveTab('upload')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-4 ${activeTab === 'upload' ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icons.Upload className="w-5 h-5" /> Upload Photo
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors border-l-4 ${activeTab === 'settings' ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icons.Settings className="w-5 h-5" /> Settings
                </button>
              </nav>
            </div>

            {/* Verification Status Card */}
            <div className="bg-green-50 rounded-xl p-6 mt-6 border border-green-100">
               <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                 <Icons.Shield className="w-5 h-5" /> Verified Seller
               </div>
               <p className="text-sm text-green-800/80">
                 Your identity has been confirmed via Telegram. You can sell unlimited photos.
               </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {profile.isNewUser && (
                   <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-3">
                     <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                       <Icons.Star className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="font-bold text-blue-900">Welcome, {profile.firstName}!</h4>
                       <p className="text-sm text-blue-700">Your profile is ready. Upload your first photo to start earning.</p>
                     </div>
                   </div>
                )}

                <div className="grid sm:grid-cols-3 gap-6">
                  {stats.map((stat, idx) => {
                    const Icon = Icons[stat.icon as keyof typeof Icons];
                    return (
                      <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className={`w-10 h-10 ${stat.bg} rounded-full flex items-center justify-center mb-4`}>
                          <Icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Sales Activity</h3>
                  {profile.photos.some(p => p.status === 'Sold') ? (
                    <div className="space-y-4">
                      {profile.photos.filter(p => p.status === 'Sold').slice(0, 3).map((photo) => (
                        <div key={photo.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                              <img src={photo.url} alt="Thumbnail" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{photo.title || 'Untitled Photo'}</p>
                              <p className="text-xs text-gray-500">Sold via Platform</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-brand-600">+{photo.price}</p>
                            <p className="text-xs text-gray-400">{photo.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No sales yet. Upload high-quality photos to attract buyers!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Your Portfolio</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.photos.map((photo) => (
                    <div key={photo.id} className="group relative rounded-lg overflow-hidden border border-gray-200">
                      <img src={photo.url} alt="Portfolio" className="w-full h-48 object-cover" />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${photo.status === 'Sold' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {photo.status}
                        </span>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex justify-between items-center mb-2">
                           <span className="font-bold text-gray-900">{photo.price}</span>
                           <span className="text-xs text-gray-500">{photo.date}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                           <button className="flex-1 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 py-1.5 rounded transition-colors">Edit</button>
                           <button className="flex-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 py-1.5 rounded transition-colors">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="flex flex-col items-center justify-center h-full min-h-[250px] border-2 border-dashed border-gray-300 rounded-lg hover:border-brand-400 hover:bg-brand-50/50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-brand-100 rounded-full flex items-center justify-center mb-3 transition-colors">
                      <Icons.Plus className="w-6 h-6 text-gray-400 group-hover:text-brand-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 group-hover:text-brand-700">Add New Photo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Upload New Content</h3>
                  <p className="text-sm text-gray-500">Share your creativity with the world.</p>
                </div>
                
                <form onSubmit={handleUploadSubmit} className="space-y-6">
                  
                  {/* Drag and Drop Zone */}
                  <div>
                    <div 
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                        dragActive 
                          ? 'border-brand-500 bg-brand-50 scale-[1.01]' 
                          : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                      } ${previewUrl ? 'border-none p-0 bg-transparent' : ''}`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => !previewUrl && fileInputRef.current?.click()}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                      
                      {previewUrl ? (
                        <div className="relative rounded-xl overflow-hidden group">
                          <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              type="button"
                              onClick={(e) => { e.stopPropagation(); clearFile(); }}
                              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                            >
                              <Icons.Trash2 className="w-6 h-6" />
                            </button>
                          </div>
                          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                            {(selectedFile!.size / (1024 * 1024)).toFixed(2)} MB
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8">
                           <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4">
                             <Icons.Upload className="w-8 h-8" />
                           </div>
                           <h4 className="text-lg font-medium text-gray-900 mb-1">Drag & Drop or Click to Upload</h4>
                           <p className="text-sm text-gray-500 mb-2">Supports JPG, PNG (Max 5MB)</p>
                           {uploadError && <p className="text-red-500 text-sm font-medium mt-2 bg-red-50 px-3 py-1 rounded">{uploadError}</p>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Details */}
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Traditional Coffee Ceremony" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (ETB)</label>
                        <div className="relative">
                          <Icons.DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                          <input 
                            type="number" 
                            placeholder="500" 
                            required
                            min="50"
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow" 
                          />
                        </div>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                         <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow">
                           <option>Culture & Tradition</option>
                           <option>Nature & Landscape</option>
                           <option>Urban & Street</option>
                           <option>Portrait</option>
                           <option>Food & Drink</option>
                         </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                      <textarea 
                        rows={3} 
                        placeholder="Tell the story behind this photo..." 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow resize-none" 
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('photos')}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={!selectedFile || isUploading}
                      className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-2 rounded-lg font-medium transition-all shadow-md shadow-brand-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>Uploading...</>
                      ) : (
                        <><Icons.Upload className="w-4 h-4" /> Publish Photo</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Account Settings</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telegram Username (Connected)</label>
                    <input type="text" disabled value={`@${profile.username}`} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={settingsForm.firstName}
                        onChange={handleSettingsChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={settingsForm.lastName}
                        onChange={handleSettingsChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" 
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Icons.CreditCard className="w-4 h-4" /> Payment Details
                    </h4>
                    <div className="space-y-4">
                       <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <select 
                          name="bankName"
                          value={settingsForm.bankName}
                          onChange={handleSettingsChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                        >
                          <option>Commercial Bank of Ethiopia (CBE)</option>
                          <option>Dashen Bank</option>
                          <option>Awash Bank</option>
                          <option>Telebirr</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input 
                          type="text" 
                          name="accountNumber"
                          value={settingsForm.accountNumber}
                          onChange={handleSettingsChange}
                          placeholder="1000..." 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      type="button" 
                      onClick={saveSettings}
                      className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};