import { DataSource } from "typeorm";
import { Region } from "./region.entity";

async function seedRegion() {
    const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 2707,
        username: 'admin',
        password: 'admin',
        database: 'romdoul_database',
        entities: [Region],
        synchronize: false
    });

    await dataSource.initialize();
    const regionRepo = dataSource.getRepository(Region);

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
        }
    }

    await dataSource.destroy();
}

seedRegion().catch(console.error);
