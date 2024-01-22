import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PersonModule } from './person/person.module';
// import { CuentaModule } from './cuenta/cuenta.module';
import { TarjetaModule } from './tarjeta/tarjeta.module';
// import { TipoCuentaModule } from './tipo-cuenta/tipo-cuenta.module';
// import { TipoGastoModule } from './tipo-gasto/tipo-gasto.module';
import { UsersModule } from './users/users.module';
import { RolModule } from './rol/rol.module';
import { PermisoModule } from './permiso/permiso.module';
import { BancoModule } from './banco/banco.module';
import { TipoTarjetaModule } from './tipo-tarjeta/tipo-tarjeta.module';
import { ProveedorTarjetaModule } from './proveedor-tarjeta/proveedor-tarjeta.module';
import { TipoCierreModule } from './tipo-cierre/tipo-cierre.module';
import { CronogramaTarjetaModule } from './cronograma-tarjeta/cronograma-tarjeta.module';
import { CuentaModule } from './cuenta/cuenta.module';
import { MetaModule } from './meta/meta.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      {
        "type": "mssql",
        "host": process.env.AZURE_HOST,
        "port": parseInt(process.env.AZURE_PORT),
        "username": "administrador",
        "password": "Unix456nel!!",
        "database": process.env.AZURE_DATABASE,
        "synchronize": true, //PRD false
        "autoLoadEntities": true,  //PRD false   */
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "options": {
          cryptoCredentialsDetails: {
              minVersion: 'TLSv1'
          }
        },
        // "logging": true,
      }
    ),
    AuthModule,

    PersonModule,

    TarjetaModule,

    UsersModule,

    RolModule,

    PermisoModule,

    BancoModule,

    TipoTarjetaModule,

    ProveedorTarjetaModule,

    TipoCierreModule,

    CronogramaTarjetaModule,

    CuentaModule,

    MetaModule,
  ],
})
export class AppModule {
  constructor(){
    // console.log(process.env);
  }
}
