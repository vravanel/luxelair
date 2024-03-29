import { ObjectType, Field, ID, Float } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Like,
} from "typeorm";
import { editOrCreateAd } from "../resolvers/AdResolver";
import Booking from "./booking";

export enum HousingTypeEnum {
  Chalet = "Chalet",
  Appartement = "Appartement",
  Maison = "Maison",
  Duplex = "Duplex",
  Loft = "Loft",
  Hotel_particulier = "Hotel_particulier",
  Chateau = "Chateau",
}

export enum EssentialEquipmentsEnum {
  Ustensiles = "Ustensiles",
  Vaisselle = "couverts et verres",
  Micro_ondes = "micro-ondes",
  Réfrigérateur = "Réfrigérateur",
  Cuisinière = "Cuisinière",
  Bouilloire = "Bouilloire",
  Cafetière = "Cafetière",
  Grille_pain = "Grille pain",
  Literie = "Literie",
  Serviettes_de_bain = "Serviettes de bain",
  Papier_toilette = "Papier toilette",
  Savon = "Savon",
  Shampooing = "Shampooing",
  Sèche_cheveux = "Sèche cheveux",
  Lave_linge = "Lave linge",
  Sèche_linge = "Sèche linge ",
}

export enum SecurityEquipementEnum {
  Détecteurs_fumée_monoxyde = "Détecteur de fumée et de monoxyde de carbone",
  Extincteur = "Extincteur",
}

export enum exceptionalServicesEnum {
  Télévision = "Télévision",
  WiFi = "Wifi",
  Climatisation = "Climatisation",
  Chauffage = "Chauffage",
  Fer_planche_à_repasser = "Fer et place à rep",
  Canapés = "Canapé",
  Fauteuils = "Fauteuils",
  Tables = "Tables et chaises",
  Espace_travail = "Espace de travail",
  Placards = "Placards",
  Pool = "piscine",
  Parking = "Parking",
  Ascenseur = "Ascenseur",
  Balcon = "Balcon",
  Jacuzzi = "Jacuzzi",
  Rooftop = "Rooftop",
  Piste_Datterissage = "piste-datterissage",
  Court_de_tennis = "cours-de-tennis",
  Chef_privé = "Chef privé",
}

export enum EquipmentTypeEnum {
  SecurityEquipement = "SecurityEquipementEnum",
  ExceptionalServices = "exceptionalServicesEnum",
  EssentialEquipmentsEnum = "EssentialEquipmentsEnum",
  Bathroom = "BathroomEnum",
  Electronics = "ElectronicsEnum",
  Kitchen = "KitchenEnum",
  Forniture = "FornitureEnum",
}

@Entity()
@ObjectType()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  title!: string;

  @Column()
  @Field()
  description!: string;

  @Column()
  @Field(() => Float)
  price!: number;

  @Column()
  @Field()
  location!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  image!: string;

  @Field(() => [String], { nullable: true })
  selectedEquipmentValues?: string[];

  @Column({
    type: "enum",
    enum: HousingTypeEnum,
    default: null,
  })
  type!: HousingTypeEnum;

  @JoinTable()
  @ManyToMany(() => Booking, (booking) => booking.ads)
  @Field(() => [Booking])
  bookings!: Booking[];

  constructor(ad?: Partial<Ad>) {
    super();
    if (ad) {
      if (!ad.title) {
        throw new Error("Le titre ne peut pas être vide");
      }
      this.title = ad.title;
      if (!ad.description) {
        throw new Error("La description ne peut pas être vide");
      }
      this.description = ad.description;
      if (!ad.price) {
        throw new Error("Le prix ne peut pas être vide");
      }
      this.price = ad.price;

      if (!ad.location) {
        throw new Error("L'adresse ne peut pas être vide");
      }
      this.location = ad.location;

      if (ad.image !== undefined) {
        this.image = ad.image;
      }

      if (!ad.selectedEquipmentValues) {
        throw new Error(
          "Les équipements sélectionnés ne peuvent pas être vides"
        );
      }
      this.selectedEquipmentValues = ad.selectedEquipmentValues;

      if (!ad.type) {
        throw new Error("Le type ne peut pas être vide");
      }
      this.type = ad.type;
    }
  }

  static async getAds(): Promise<Ad[]> {
    const ads = await Ad.find();
    return ads;
  }

  static async getAdById(id: string): Promise<Ad> {
    const ad = await Ad.findOneBy({ id: id });
    if (!ad) {
      throw new Error("Ad does not exist");
    }
    return ad;
  }

  static async searchAd(location: string): Promise<Ad[]> {
    const adLocation = await Ad.find({
      where: { location: Like(`%${location}%`) },
    });
    if (!adLocation) {
      throw new Error("Ad does not exist");
    }
    return adLocation || [];
  }

  static async createAd(adInformations: editOrCreateAd): Promise<Ad> {
    const newAd = new Ad(adInformations);
    const savedAd = await newAd.save();
    return savedAd;
  }

  static async updateAd(id: string, adInformations: Ad): Promise<Ad> {
    const adToUpdate = await Ad.findOneBy({ id: id });
    if (!adToUpdate) {
      throw new Error("Ad does not exist");
    }
    await Ad.update(id, adInformations);
    await adToUpdate?.reload();
    return adToUpdate;
  }

  static async deleteAd(id: number): Promise<void> {
    const { affected } = await Ad.delete(id);
    if (affected === 0) {
      throw new Error(`Ad with ID ${id} does not exist.`);
    }
  }
}

export default Ad;
