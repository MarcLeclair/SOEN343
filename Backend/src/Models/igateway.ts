
export interface Igateway{
    save(): Promise<boolean>;
    modify(): Promise<boolean>;
    delete(): Promise<boolean>;

}