'use client';
import { estimateSalary, getAllProvinces, getProvinceDetails } from "@/lib/province-services";
import { District, Province, SalaryResponse } from "@/types";
import { useEffect, useState } from "react";

const CVSalaryEstimator = () => {
   const [file, setFile] = useState<File | null>(null);
      const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [provinceCode, setProvinceCode] = useState('');
  const [provinceName, setProvinceName] = useState('');
  const [districtCode, setDistrictCode] = useState('');
  const [districtName, setDistrictName] = useState('');
  
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  
  const [salaryResponse, setSalaryResponse] = useState<SalaryResponse | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setIsLoadingProvinces(true);
        setError(''); // Clear previous errors
        const data = await getAllProvinces();
        setProvinces(data);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Không thể tải danh sách tỉnh thành. Vui lòng tải lại trang.';
        setError(errorMessage);
        setProvinces([]);
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!provinceCode) {
      setDistricts([]);
      setDistrictCode('');
      setDistrictName('');
      return;
    }

    const fetchDistricts = async () => {
      try {
        setIsLoadingDistricts(true);
        const data = await getProvinceDetails(Number(provinceCode));
        if (data.districts) {
          setDistricts(data.districts);
        } else {
          setDistricts([]);
        }
      } catch (err) {
        console.error('Lỗi khi tải danh sách quận/huyện:', err);
        setDistricts([]);
      } finally {
        setIsLoadingDistricts(false);
      }
    };

    fetchDistricts();
  }, [provinceCode]);

  const handleFileChange = (e:any) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFile(null);
        setError('Kích thước file không được vượt quá 5MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Vui lòng tải lên file PDF');
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!file) {
      setError('Vui lòng tải lên CV của bạn');
      return;
    }

    if (!provinceCode) {
      setError('Vui lòng chọn tỉnh/thành phố của bạn');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(''); 
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      const result = await estimateSalary(file, provinceName, districtName || undefined);
      
      clearInterval(interval);
      setUploadProgress(100);
      
      if (!result.success) {
        setError(result.error || 'Có lỗi xảy ra khi phân tích CV');
        return; 
      }
      
      setSalaryResponse(result.data.data);
      
    } catch (err) {
      console.error("Lỗi không xử lý được:", err);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định trong quá trình xử lý');
    } finally {
      clearInterval(interval); 
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setSalaryResponse(null);
    setProvinceCode('');
    setProvinceName('');
    setDistrictCode('');
    setDistrictName('');
    setError('');
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-60 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-lg border border-white/20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/70 to-white/30 z-0"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-8 text-center text-purple-800 drop-shadow-sm">Ước Tính Lương Từ CV</h1>
          
          {!salaryResponse ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="backdrop-blur-sm bg-white/40 border border-white/60 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <input 
                  type="file" 
                  id="cv-upload" 
                  onChange={handleFileChange} 
                  className="hidden"
                  accept=".pdf"
                />
                
                <label 
                  htmlFor="cv-upload" 
                  className="block cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 text-purple-600 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="mt-4 text-lg text-purple-800 font-medium">
                      {file ? file.name : 'Kéo thả CV của bạn vào đây hoặc nhấp để duyệt'}
                    </span>
                    <span className="mt-2 text-sm text-purple-600">Chỉ hỗ trợ file PDF (Tối đa 5MB)</span>
                  </div>
                </label>
                
                {file && (
                  <div className="mt-6 backdrop-blur-sm bg-purple-100/50 p-4 rounded-lg border border-purple-200/50 flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-purple-700 font-medium">{file.name}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setFile(null)}
                      className="text-purple-500 hover:text-purple-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={provinceCode}
                      onChange={(e) => {
                        const code = e.target.value;
                        setProvinceCode(code);
                        
                        // Get province name from code
                        if (code) {
                          const selectedProvince = provinces.find(p => p.code.toString() === code);
                          if (selectedProvince) {
                            setProvinceName(selectedProvince.name);
                          }
                        } else {
                          setProvinceName('');
                        }
                      }}
                      className={`w-full p-3 backdrop-blur-sm bg-white/70 border border-white/60 text-purple-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all ${isLoadingProvinces ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isLoadingProvinces}
                    >
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      {isLoadingProvinces ? (
                        <option value="" disabled>Đang tải...</option>
                      ) : (
                        provinces.map((province) => (
                          <option key={province.code} value={province.code}>
                            {province.name}
                          </option>
                        ))
                      )}
                    </select>
                    {isLoadingProvinces && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="animate-spin h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Quận/Huyện <span className="text-sm font-normal text-purple-500">(tùy chọn)</span>
                  </label>
                  <div className="relative">
                    <select
                      value={districtCode}
                      onChange={(e) => {
                        const code = e.target.value;
                        setDistrictCode(code);
                        
                        if (code) {
                          const selectedDistrict = districts.find(d => d.code.toString() === code);
                          if (selectedDistrict) {
                            setDistrictName(selectedDistrict.name);
                          }
                        } else {
                          setDistrictName('');
                        }
                      }}
                      className={`w-full p-3 backdrop-blur-sm bg-white/70 border border-white/60 text-purple-800 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all ${!provinceCode || isLoadingDistricts ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!provinceCode || isLoadingDistricts}
                    >
                      <option value="">Chọn Quận/Huyện (tùy chọn)</option>
                      {!provinceCode ? (
                        <option value="" disabled>Hãy chọn Tỉnh/Thành phố trước</option>
                      ) : isLoadingDistricts ? (
                        <option value="" disabled>Đang tải...</option>
                      ) : districts.length === 0 ? (
                        <option value="" disabled>Không có dữ liệu</option>
                      ) : (
                        districts.map((district) => (
                          <option key={district.code} value={district.code}>
                            {district.name}
                          </option>
                        ))
                      )}
                    </select>
                    {isLoadingDistricts && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="animate-spin h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="backdrop-blur-sm bg-red-50/70 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">CV không hợp lệ</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p className="whitespace-pre-wrap">{error}</p>
                      </div>
                      {error.includes('tỉnh thành') && (
                        <div className="mt-4">
                          <button 
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center px-4 py-2 backdrop-blur-sm bg-white/50 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                          >
                            <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Tải lại trang
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={isUploading || !file || !provinceCode || isLoadingProvinces}
                className={`w-full py-3 px-6 text-lg rounded-lg text-white font-medium transition-all duration-300 shadow-md ${
                  isUploading || !file || !provinceCode || isLoadingProvinces
                    ? 'backdrop-blur-sm bg-purple-400/70 cursor-not-allowed' 
                    : 'backdrop-blur-sm bg-purple-600/90 hover:bg-purple-700/90 hover:shadow-lg'
                }`}
              >
                {isUploading ? 'Đang phân tích...' : 'Ước tính lương'}
              </button>
              
              {/* Upload progress */}
              {isUploading && (
                <div className="mt-4">
                  <div className="w-full bg-purple-100/50 backdrop-blur-sm rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-purple-600 mt-2 text-center">Đang phân tích CV của bạn... {uploadProgress}%</p>
                </div>
              )}
            </form>
          ) : (
            <div className="backdrop-blur-md bg-white/40 p-8 rounded-xl border border-white/70 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-purple-800">Ước tính mức lương của bạn</h2>
                <div className="mt-6">
                  <div className="inline-block backdrop-blur-sm bg-purple-100/50 px-8 py-4 rounded-xl border border-purple-200/50">
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
                      {salaryResponse && new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salaryResponse.estimatedSalary)}
                    </div>
                    <p className="mt-2 text-purple-600">mỗi tháng</p>
                  </div>
                </div>
                <p className="mt-4 text-purple-700 font-medium">
                  {salaryResponse?.location || (provinceName + (districtName ? `, ${districtName}` : ''))}
                </p>
              </div>
              
              {salaryResponse && (
                <div className="mt-8 border-t border-purple-200/50 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="backdrop-blur-md bg-white/30 p-4 rounded-lg border border-white/60 shadow-sm group hover:shadow-md transition-all">
                      <h3 className="text-sm font-medium text-purple-600 mb-1">Vị trí công việc</h3>
                      <p className="text-lg text-purple-800 font-semibold group-hover:translate-x-1 transition-transform">{salaryResponse.positionLevel}</p>
                    </div>
                    <div className="backdrop-blur-md bg-white/30 p-4 rounded-lg border border-white/60 shadow-sm group hover:shadow-md transition-all">
                      <h3 className="text-sm font-medium text-purple-600 mb-1">Lĩnh vực</h3>
                      <p className="text-lg text-purple-800 font-semibold group-hover:translate-x-1 transition-transform">{salaryResponse.field}</p>
                    </div>
                    <div className="backdrop-blur-md bg-white/30 p-4 rounded-lg border border-white/60 shadow-sm group hover:shadow-md transition-all">
                      <h3 className="text-sm font-medium text-purple-600 mb-1">Ngành nghề</h3>
                      <p className="text-lg text-purple-800 font-semibold group-hover:translate-x-1 transition-transform">{salaryResponse.jobCategory}</p>
                    </div>
                  </div>
                  
                  {salaryResponse.salaryReason && (
                    <div className="mt-6 backdrop-blur-md bg-white/30 p-5 rounded-lg border border-white/60 shadow-md">
                      <h3 className="text-lg font-medium text-purple-700 mb-3">Phân tích lương</h3>
                      <p className="text-purple-800 leading-relaxed">{salaryResponse.salaryReason}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-10 flex justify-center">
                <button
                  onClick={resetForm}
                  className="py-3 px-6 backdrop-blur-sm bg-white/50 border border-purple-300 rounded-lg text-purple-700 font-medium hover:bg-purple-50/50 hover:shadow-md transition-all duration-300"
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Tải lên CV khác
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVSalaryEstimator;