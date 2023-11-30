/*
declare module 'xlsx-style' {
    

  export interface WorkBook {
    name: string;
    sheets: Array<WorkSheet>;
    utils :{};
  }
    export interface WorkSheet {
      name: string;
      data: Array<any>;
      styles: Styles;
    }
    
    interface Styles {
      styles: Record<string, Style>;
      
    }
    
    interface Style {
      color: string;
      font: string;
      size: number;
    }

    
  }
  */

  
declare module 'xlsx-style' {
  interface XlsxStyle {
    // ...
    utils: {
      formatDate: (date: Date) => string;
      formatNumber: (number: number) => string;
    };
  }
}