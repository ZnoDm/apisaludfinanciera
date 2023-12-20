import { Test, TestingModule } from '@nestjs/testing';
import { TipoCuentaController } from './tipo-cuenta.controller';
import { TipoCuentaService } from './tipo-cuenta.service';

describe('TipoCuentaController', () => {
  let controller: TipoCuentaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCuentaController],
      providers: [TipoCuentaService],
    }).compile();

    controller = module.get<TipoCuentaController>(TipoCuentaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
