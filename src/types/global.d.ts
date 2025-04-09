export {};

declare global {
  interface Window {
    IMP?: {
      init: (_merchantCode: string) => void;
      request_pay: (
        _data: {
          pg: string;
          pay_method: string;
          merchant_uid: string;
          name: string;
          amount: number;
          buyer_email?: string;
          buyer_name?: string;
          buyer_tel?: string;
        },
        _callback: (_response: {
          success: boolean;
          imp_uid?: string;
          merchant_uid?: string;
          error_msg?: string;
        }) => void
      ) => void;
    };
  }
}
