import { AppDataSource } from "../data-source"; // Adjust path based on where data-source.ts is
import { Amenity } from "./amenity.entity";
import { AmenityType } from "./amenity_type.enum";

async function seedAmenity() {
    await AppDataSource.initialize();
    console.log('✓ Database connected');

    const amenityRepo = AppDataSource.getRepository(Amenity);

    const amenities = [
        { name: 'Wifi', icon_name: 'material-symbols:wifi', type: AmenityType.GUEST_FAVORITE },
        { name: 'TV', icon_name: 'material-symbols-light:tv-outline-rounded', type: AmenityType.GUEST_FAVORITE },
        { name: 'Kitchen', icon_name: 'fluent:oven-48-regular', type: AmenityType.GUEST_FAVORITE },
        { name: 'Washer', icon_name: 'fluent:washer-32-regular', type: AmenityType.GUEST_FAVORITE },
        { name: 'Free parking', icon_name: 'iconoir:parking', type: AmenityType.GUEST_FAVORITE },
        { name: 'Paid parking', icon_name: 'maki:parking-paid', type: AmenityType.GUEST_FAVORITE },
        { name: 'Air conditioning', icon_name: 'mynaui:snow', type: AmenityType.GUEST_FAVORITE },
        { name: 'Dedicated workspace', icon_name: 'streamline:workspace-desk', type: AmenityType.GUEST_FAVORITE },
        { name: 'Pool', icon_name: 'cil:pool', type: AmenityType.STANDOUT },
        { name: 'Coffee machine', icon_name: 'icon-park-outline:coffee-machine', type: AmenityType.STANDOUT },
        { name: 'Balcony', icon_name: 'iconoir:balcony', type: AmenityType.STANDOUT },
        { name: 'Garden', icon_name: 'hugeicons:flower-pot', type: AmenityType.STANDOUT },
        { name: 'Fire pit', icon_name: 'hugeicons:fire-pit', type: AmenityType.STANDOUT },
        { name: 'BBQ grill', icon_name: 'hugeicons:bbq-grill', type: AmenityType.STANDOUT },
        { name: 'Smoke alarm', icon_name: 'tabler:alarm-smoke', type: AmenityType.SAFETY_ITEM },
        { name: 'First aid kit', icon_name: 'hugeicons:first-aid-kit', type: AmenityType.SAFETY_ITEM },
        { name: 'Fire extinguisher', icon_name: 'streamline:fire-extinguisher-sign', type: AmenityType.SAFETY_ITEM },
    ];

    for (const amenityData of amenities) {
        const exists = await amenityRepo.findOne({ where: { name: amenityData.name } });
        if (!exists) {
            const amenity = amenityRepo.create(amenityData);
            await amenityRepo.save(amenity);
            console.log(`✓ Created: ${amenityData.name}`);
        } else {
            console.log(`- Skipped: ${amenityData.name} (already exists)`);
        }
    }

    console.log('\n✓ Amenity seeding completed!');
    await AppDataSource.destroy();
}

seedAmenity().catch(console.error);