import { Test, TestingModule } from '@nestjs/testing';
import { TarjetaController } from './tarjeta.controller';
import { TarjetaService } from './tarjeta.service';

describe('TarjetaController', () => {
  let controller: TarjetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarjetaController],
      providers: [TarjetaService],
    }).compile();

    controller = module.get<TarjetaController>(TarjetaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
