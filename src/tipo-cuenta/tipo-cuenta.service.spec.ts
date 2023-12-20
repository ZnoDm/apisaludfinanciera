import { Test, TestingModule } from '@nestjs/testing';
import { TipoCuentaService } from './tipo-cuenta.service';

describe('TipoCuentaService', () => {
  let service: TipoCuentaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoCuentaService],
    }).compile();

    service = module.get<TipoCuentaService>(TipoCuentaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
