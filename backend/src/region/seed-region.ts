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
        "Chamkarmon",
        "Dangkao",
        "Daun Penh",
        "Mean Chey",
        "Prampir Makara",
        "Russei Keo",
        "Sen Sok",
        "Toul Kork",
        "Chbar Ampov",
        "Chroy Changvar",
        "Prek Pnov",
        "Por Senchey",
        "Kamboul",
        "Boeng Keng Kang"
    ];

    for (const name of regions) {
        const exists = await regionRepo.findOne({ where: { region_name: name } });
        if (!exists) {
            const region = regionRepo.create({region_name: name});
            await regionRepo.save(region);
        }
    }

    await dataSource.destroy();
}

seedRegion().catch(console.error);