export class User {
    private id: number;
    private firstName: string;
    private lastName: string;
    private pictureUrl: string;
    private age: number;

    private static lastUsedId: number = 0;

    public constructor(firstName: string, lastName: string, pictureUrl: string, age: number)
    {
        User.lastUsedId += 1;
        
        this.id = User.lastUsedId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pictureUrl = pictureUrl;
        this.age = age;
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
