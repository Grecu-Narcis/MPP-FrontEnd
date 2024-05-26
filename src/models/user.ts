export class User {
    private id: number;
    private firstName: string;
    private lastName: string;
    private email: string;


    public constructor(id:number, firstName: string, lastName: string, email: string)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public getId(): number {
        return this.id;
    }

    public setId(newId: number) {
        this.id = newId;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(newFirstName: string) {
        this.firstName = newFirstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(newLastName: string) {
        this.lastName = newLastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(newEmail: string) {
        this.email = newEmail;
    }
}
