"use client";
import CVSalaryEstimator from "@/components/CVSalaryEstimator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-white/10 backdrop-blur-xl rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/3 w-32 h-32 bg-white/10 backdrop-blur-xl rounded-full"></div>
      
      <div className="max-w-5xl mx-auto">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-indigo-100">
                Ước Tính Lương Từ CV
              </span>
            </h1>
            <p className="mt-4 text-xl text-purple-100 max-w-2xl mx-auto">
              Tải lên CV của bạn và chọn tỉnh/thành phố để nhận ước tính lương ngay lập tức
            </p>
          </div>
        </div>
        
        <CVSalaryEstimator />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Cách thức hoạt động
            </h2>
            <div className="mt-4 text-purple-100 space-y-3">
              <p className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-purple-500/30 backdrop-blur-sm mr-2 flex-shrink-0 mt-0.5"></span>
                <span>Hệ thống của chúng tôi phân tích CV để xác định kỹ năng, kinh nghiệm và trình độ học vấn của bạn.</span>
              </p>
              <p className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-purple-500/30 backdrop-blur-sm mr-2 flex-shrink-0 mt-0.5"></span>
                <span>Chúng tôi so sánh hồ sơ của bạn với dữ liệu thị trường hiện tại cho tỉnh/thành phố đã chọn.</span>
              </p>
              <p className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-purple-500/30 backdrop-blur-sm mr-2 flex-shrink-0 mt-0.5"></span>
                <span>Ước tính lương dựa trên dữ liệu lương theo vị trí địa lý và kỹ năng của bạn.</span>
              </p>
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Thông tin bảo mật
            </h2>
            <div className="mt-4 text-purple-100 space-y-3">
              <p className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-purple-500/30 backdrop-blur-sm mr-2 flex-shrink-0 mt-0.5"></span>
                <span>CV của bạn được xử lý an toàn bởi hệ thống và không được lưu trữ vĩnh viễn.</span>
              </p>
              <p className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-purple-500/30 backdrop-blur-sm mr-2 flex-shrink-0 mt-0.5"></span>
                <span>CV của bạn được sử dụng để phục vụ mục đích phân tích, nâng cao chất lượng dịch vụ.</span>
              </p>
              <p className="flex items-start">
                <span className="inline-block w-5 h-5 rounded-full bg-purple-500/30 backdrop-blur-sm mr-2 flex-shrink-0 mt-0.5"></span>
                <span>Tất cả kết nối đều được mã hóa để đảm bảo an toàn dữ liệu.</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 backdrop-blur-sm bg-white/5 p-5 rounded-xl border border-white/10 shadow-lg">
          <p className="text-center text-purple-200 text-sm">
            Công cụ này cung cấp ước tính dựa trên dữ liệu thị trường hiện tại và nội dung CV của bạn.
            Mức lương thực tế có thể thay đổi dựa trên các yếu tố bổ sung không được ghi lại trong CV của bạn.
          </p>
        </div>
      </div>
    </main>
  );
}