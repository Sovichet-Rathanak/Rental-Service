import { AppDataSource } from "../data-source"; // Adjust path as needed
import { Region } from "./region.entity";

async function seedRegion() {
    await AppDataSource.initialize();
    console.log('✓ Database connected');

    const regionRepo = AppDataSource.getRepository(Region);

    const regions = [
        "Boeng Keng Kang",
        "Chamkarmon",
        "Chbar Ampov",
        "Chroy Changvar",
        "Dangkao",
        "Daun Penh",
        "Kamboul",
        "Mean Chey",
        "Por Senchey",
        "Prampir Makara",
        "Prek Pnov",
        "Russei Keo",
        "Sen Sok",
        "Toul Kork"
    ];

    for (const name of regions) {
        const exists = await regionRepo.findOne({ where: { region_name: name } });
        if (!exists) {
            const region = regionRepo.create({ region_name: name });
            await regionRepo.save(region);
            console.log(`✓ Created: ${name}`);
        } else {
            console.log(`- Skipped: ${name} (already exists)`);
        }
    }

    console.log('\n✓ Region seeding completed!');
    await AppDataSource.destroy();
}

seedRegion().catch(console.error);