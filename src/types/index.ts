export interface Province {
   name: string;
   code: number;
   districts: District[];
}

export interface District {
   name: string;
   code: number;
}

export interface SalaryResponse {
   positionLevel: string;
   jobCategory: string;
   field: string;
   location: string;
   estimatedSalary: number;
   salaryReason: string;
   improvementSuggestions: string;
}