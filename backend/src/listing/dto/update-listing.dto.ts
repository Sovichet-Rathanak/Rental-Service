import { PartialType } from "@nestjs/mapped-types";
import { createListingDTO } from "./create-listing.dto";

export class updateListingDTO extends PartialType(createListingDTO){}
