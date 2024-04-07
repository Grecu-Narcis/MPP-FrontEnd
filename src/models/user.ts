export class User {
    private id: string;
    private firstName: string;
    private lastName: string;
    private pictureUrl: string;
    private age: number;


    public constructor(id:string, firstName: string, lastName: string, pictureUrl: string, age: number)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pictureUrl = pictureUrl;
        this.age = age;
    }

    public getId(): string {
        return this.id;
    }

    public setId(newId: string) {
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

    public getPictureUrl(): string {
        return this.pictureUrl;
    }

    public setPictureUrl(newPictureUrl: string) {
        this.pictureUrl = newPictureUrl;
    }

    public getAge(): number {
        return this.age;
    }

    public setAge(newAge: number): void {
        this.age = newAge;
    }
}
