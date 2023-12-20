import { Test, TestingModule } from '@nestjs/testing';
import { TipoGastoController } from './tipo-gasto.controller';
import { TipoGastoService } from './tipo-gasto.service';

describe('TipoGastoController', () => {
  let controller: TipoGastoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoGastoController],
      providers: [TipoGastoService],
    }).compile();

    controller = module.get<TipoGastoController>(TipoGastoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
