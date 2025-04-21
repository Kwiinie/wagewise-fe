import { Province } from "../types";



export async function getAllProvinces(): Promise<Province[]> {
  try {
    const response = await fetch('https://provinces.open-api.vn/api/p/');
    if (!response.ok) {
      throw new Error('Không thể tải danh sách tỉnh thành');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi tải danh sách tỉnh thành:', error);
    throw error;
  }
}


export async function getProvinceDetails(provinceCode: number): Promise<Province> {
  try {
    const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
    if (!response.ok) {
      throw new Error('Không thể tải thông tin tỉnh thành');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi tải thông tin tỉnh thành:', error);
    throw error;
  }
}


export async function estimateSalary(
   file: File, 
   provinceName: string, 
   districtName?: string
 ): Promise<{ success: boolean; data?: any; error?: string }> {
   try {
     const formData = new FormData();
     formData.append('file', file);
     
     formData.append('province', provinceName);

     if(districtName){
      formData.append('district', districtName);
     }

     
     const response = await fetch('https://wagewise-be-hqb6d8cedrducsa4.southeastasia-01.azurewebsites.net/api/CV', {
       method: 'POST',
       body: formData,
     });
     
     const responseText = await response.text();
     let data;
     try {
       data = JSON.parse(responseText);
     } catch (e) {
       return { 
         success: false, 
         error: responseText || 'Có lỗi xảy ra khi phân tích phản hồi từ server'
       };
     }
 
     if (response.ok) {
       if (data.isSuccess && data.data) {
         return { success: true, data: data.data };
       } 
       else if (data.isSuccess === undefined) {
         return { success: true, data };
       }
       else {
         return { 
           success: false, 
           error: data.error || 'Không thể ước tính lương từ CV này'
         };
       }
     } else {
       if (data && data.error) {
         return { success: false, error: data.error };
       }
       else if (data && data.success === false && data.error) {
         return { success: false, error: data.error };
       }
       else {
         return { 
           success: false, 
           error: 'Có lỗi xảy ra khi phân tích CV: ' + (response.statusText || 'Lỗi không xác định')
         };
       }
     }
   } catch (error) {
     console.error('Lỗi khi ước tính lương:', error);
     return { 
       success: false, 
       error: error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định' 
     };
   }
 }