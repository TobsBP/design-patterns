import { IMediator } from './IMediator';

// Colega: conhece só o mediador. Nenhum componente chama outro diretamente.
export abstract class FormComponent {
  protected mediator?: IMediator;

  setMediator(mediator: IMediator): void {
    this.mediator = mediator;
  }

  protected notify(event: string): void {
    this.mediator?.notify(this.constructor.name, event);
  }
}
