export class Car {
    private id: number;
    private brand: string;
    private model: string;
    private year: number;
    private price: number;
    private pictureUrl: string;
    private mileage: number;
    private fuelType: string;

    
    public constructor(id: number, brand: string, model: string, year: number, price: number, pictureUrl: string, mileage: number, fuelType: string) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.pictureUrl = pictureUrl;
        this.mileage = mileage;
        this.fuelType = fuelType;
    }
    

    public getId(): number {
        return this.id;
    }

    public setId(newId: number) {
        this.id = newId;
    }

    public getBrand(): string {
        return this.brand;
    }

    public setBrand(newBrand: string) {
        this.brand = newBrand;
    }

    public getModel(): string {
        return this.model;
    }

    public setModel(newModel: string) {
        this.model = newModel;
    }

    public getYear(): number {
        return this.year;
    }

    public setYear(newYear: number) {
        this.year = newYear;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(newPrice: number) {
        this.price = newPrice;
    }

    public getPictureUrl(): string {
        return this.pictureUrl;
    }

    public setPictureUrl(newPictureUrl: string) {
        this.pictureUrl = newPictureUrl;
    }

    public getMileage(): number {
        return this.mileage;
    }

    public setMileage(newMileage: number) {
        this.mileage = newMileage;
    }

    public getFuelType(): string {
        return this.fuelType;
    }

    public setFuelType(newFuelType: string) {
        this.fuelType = newFuelType;
    }

    public toString(): string {
        return 'Car: ' + this.id + ' ' + this.brand + ' ' + this.model + ' ' + this.year + ' ' + this.price + ' ' + this.pictureUrl + ' ' + this.mileage + ' ' + this.fuelType;
    }
}

// @Column(name = "id", updatable = false)
//     private Long id;

//     @Column(name = "brand", nullable = false, length = 50)
//     private String brand;

//     @Column(name = "model", nullable = false, length = 50)
//     private String model;

//     @Column(name = "year", nullable = false)
//     private int year;


//     @Column(name = "price", nullable = false)
//     private int price;

//     @Column(name = "picture_url", nullable = false, columnDefinition = "TEXT")
//     private String pictureUrl;

//     @Column(name = "license_plate", nullable = false, length = 50)
//     private String licensePlate;