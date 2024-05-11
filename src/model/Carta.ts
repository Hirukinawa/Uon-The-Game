
export interface ICarta {
    id: number;
    name: string;
    color: string;
    power(...itens: any[]): any;
}