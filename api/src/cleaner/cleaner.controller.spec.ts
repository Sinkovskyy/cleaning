import { Test, TestingModule } from '@nestjs/testing';
import { CleanerController } from './cleaner.controller';

describe('CleanerController', () => {
  let controller: CleanerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CleanerController],
    }).compile();

    controller = module.get<CleanerController>(CleanerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
