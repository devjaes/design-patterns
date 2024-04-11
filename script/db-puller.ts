const { Client } = require('pg');

const client = new Client({
  // Tu configuración de conexión
  host: 'localhost',
  port: 5435,
  user: 'postgres',
  password: 'admin',
  database: 'first',
});

const fetchTables = async () => {
  await client.connect();

  // Obtener las tablas de la base de datos
  const tablesRes = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `);

  console.log('Tablas encontradas:', tablesRes.rows);

  for (const row of tablesRes.rows) {
    const tableName = row.table_name;
    const columnsRes = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = '${tableName}'
    `);

    //identificar id y referencias por tipo de dato

    //identificar si tiene id

    //identificar si tiene referencia

    const id = columnsRes.rows.find((column) => column.column_name === 'id');
    const references = columnsRes.rows.filter((column) =>
      column.column_name.includes('_id'),
    );

    // Aquí iría la lógica para generar el código de la entidad TypeORM
    // y escribirlo en un archivo .ts
    console.log(`Generando entidad para: ${tableName}`);
    generateEntityCode(tableName, columnsRes.rows, id, references);
  }

  await client.end();
};

const generateEntityCode = (tableName, columns, id, references) => {
  let entityCode = `import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';\n\n`;
  entityCode += `@Entity()\n`;
  entityCode += `export class ${toPascalCase(tableName)} {\n`;

  // Aquí debes agregar el decorador @PrimaryGeneratedColumn() al id
  if (id) {
    entityCode += `  @PrimaryGeneratedColumn()\n  ${id.column_name}: ${convertToTypeScriptType(id.data_type)};\n`;
  }

  // Aquí debes agregar los decoradores @Column() a las columnas

  for (const column of columns) {
    // Aquí debes convertir los tipos de datos de PostgreSQL a los de TypeORM
    // y agregar los decoradores de Column adecuados.
    if (column.column_name === 'id') {
      continue;
    }

    if (references.find((ref) => ref.column_name === column.column_name)) {
      entityCode += `  @Column()\n  ${column.column_name}: ${convertToTypeScriptType(column.data_type)};\n`;
      continue;
    }

    const columnCode = `@Column()\n  ${column.column_name}: ${convertToTypeScriptType(column.data_type)};\n`;
    entityCode += columnCode;
  }

  entityCode += `}\n`;

  // Escribir entityCode a un archivo aquí

  const fs = require('fs');
  //resolver si no existe la carpeta o archivo
  if (!fs.existsSync('src/s-entities')) {
    fs.mkdirSync('src/s-entities');
  }

  if (fs.existsSync(`src/s-entities/${toPascalCase(tableName)}.ts`)) {
    fs.unlinkSync(`src/s-entities/${toPascalCase(tableName)}.ts`);
  }
  fs.writeFileSync(`src/s-entities/${toPascalCase(tableName)}.ts`, entityCode);

  console.log(`Entidad generada para: ${tableName}`);
};

const toPascalCase = (str) => {
  // Convertir snake_case a PascalCase
  return str.replace(
    /(\w)(\w*)/g,
    (_, first, rest) => first.toUpperCase() + rest.toLowerCase(),
  );
};

const convertToTypeScriptType = (sqlType) => {
  // Convertir tipos de datos SQL a TypeScript
  switch (sqlType) {
    case 'integer' ||
      'smallint' ||
      'bigint' ||
      'numeric' ||
      'real' ||
      'double precision' ||
      'serial' ||
      'bigserial' ||
      'smallserial' ||
      'money' ||
      'oid' ||
      'xid' ||
      'cid' ||
      'tid' ||
      'int2vector' ||
      'oidvector' ||
      'pg_node_tree' ||
      'pg_ndistinct' ||
      'pg_dependencies' ||
      'pg_ddl_command' ||
      'pg_roles' ||
      'pg_settings' ||
      'pg_file_settings' ||
      'pg_hba_file_rules' ||
      'pg_ident_file_rules' ||
      'pg_shdepend' ||
      'pg_shdescription' ||
      'pg_ts_config_map' ||
      'pg_ts_config' ||
      'pg_ts_dict' ||
      'pg_ts_parser' ||
      'pg_ts_template' ||
      'pg_extension' ||
      'pg_foreign_data_wrapper' ||
      'pg_foreign_server' ||
      'pg_foreign_table' ||
      'pg_policy' ||
      'pg_replication_origin' ||
      'pg_subscription' ||
      'pg_statistic' ||
      'pg_statistic_ext':
      return 'number';
    case 'character varying' ||
      'text' ||
      'char' ||
      'uuid' ||
      'jsonb' ||
      'json' ||
      'bytea' ||
      'inet' ||
      'cidr' ||
      'macaddr' ||
      'bit' ||
      'bit varying' ||
      'money' ||
      'xml' ||
      'tsvector' ||
      'tsquery' ||
      'macaddr8' ||
      'pg_lsn' ||
      'pg_snapshot' ||
      'pg_type' ||
      'pg_ndistinct' ||
      'pg_dependencies' ||
      'pg_ddl_command' ||
      'pg_roles' ||
      'pg_settings' ||
      'pg_file_settings' ||
      'pg_hba_file_rules' ||
      'pg_ident_file_rules' ||
      'pg_shdepend' ||
      'pg_shdescription' ||
      'pg_ts_config_map' ||
      'pg_ts_config' ||
      'pg_ts_dict' ||
      'pg_ts_parser' ||
      'pg_ts_template' ||
      'pg_extension' ||
      'pg_foreign_data_wrapper' ||
      'pg_foreign_server' ||
      'pg_foreign_table' ||
      'pg_policy' ||
      'pg_replication_origin' ||
      'pg_subscription' ||
      'pg_statistic' ||
      'pg_statistic_ext':
      return 'string';
    case 'timestamp without time zone' ||
      'timestamp with time zone' ||
      'date' ||
      'time without time zone' ||
      'time with time zone' ||
      'interval' ||
      'pg_lsn' ||
      'pg_snapshot' ||
      'pg_type' ||
      'pg_ndistinct' ||
      'pg_dependencies' ||
      'pg_ddl_command' ||
      'pg_roles' ||
      'pg_settings' ||
      'pg_file_settings' ||
      'pg_hba_file_rules' ||
      'pg_ident_file_rules' ||
      'pg_shdepend' ||
      'pg_shdescription' ||
      'pg_ts_config_map' ||
      'pg_ts_config' ||
      'pg_ts_dict' ||
      'pg_ts_parser' ||
      'pg_ts_template' ||
      'pg_extension' ||
      'pg_foreign_data_wrapper' ||
      'pg_foreign_server' ||
      'pg_foreign_table' ||
      'pg_policy' ||
      'pg_replication_origin' ||
      'pg_subscription' ||
      'pg_statistic' ||
      'pg_statistic_ext':
      return 'Date';
    case 'boolean':
      return 'boolean';
    case 'enum':
      return 'enum';
    default:
      return 'any';
  }
};

fetchTables().catch((err) => console.error(err));
