---
date: 2024-04-16 
categories:
  - Delphi
---
# Delphi

Durante minha carrreira de desenvolvimento, algumas das soluções mais impactantes foram desenvolvidas em delphi, entre elas, algumas coisas relacionadas ao fluxo de algodão (industria) entre outros projetos satelites para ERP. Com essa tecnologia (muitas vezes julgada) eu conseguia prototipar coisas de forma rapida e as vezes o protótipo ficava tão funcional que não evoluia o projeto para o que eu queria (criar classes, padronizar código e etc). Dessa forma eu fui acumulando alguns conhecimentos da ferramenta delphi e não da linguagem. Hoje, eu entendo que por mais rapido que um protótipo seja e que seja funcional, é extremamente importante começar de uma forma que permita seu projeto evoluir (temos um nome bonito, escalar). Quando se desenvolve para em uma equipe de um unico dev, tudo é simples, agora quando temos 2 ou mais devs, padrozinar é importante para a saúde do projeto e dos devs (sai até porrada).

Vou deixar registrado aqui algumas dicas importantes que mudaram minha forma de trabalhar com a tecnologia e alguns conceitos que aprendi e sigo aplicando em projetos.

## TL;DR

* O Arrasta e solta é igual cartão de crédito, uma hora você vai pagar.
* Retorne você mesmo
* Planeje com interfaces
* Limpe sua memória (Em breve)
* Repetiu 3 vezes, padronize (Em breve)
* Composição é muito legal (Em breve)
* Pense simples (Simples não é fácil) (Em breve)
* Separe responsabilidades (Em breve)

## O Arrasta e solta é igual cartão de crédito, uma hora você vai pagar

Os meus primeiros projetos foram muito legais, tipo eu vi um video, tinha um delphi e um sonho, ser programador. File, new, Vcl Windows Application, arrasta ali os componentes de conexão, dataset, datasource, grid, F9 e tá feito a aplicação. Seu cliete fica satisfeito porque foi rápido e eficiente e você aproveitou o poder do RAD (Rappid application Development). De repente, temos 10 telas iguais, e descobrimos um novo componente de conexão. Pronto, tá feito um débito técnico gigante e que provavelmente não vai ser solucionado (Vai ser trocado os componentes nas telas e o problema pode ocorrer novamente caso encontre um novo componente).

Isso é o mais comum em projetos delphi, essa prototipação rapida e simples, se torna algo extremamente dificil de manter atualizado e dar manutenção. De repente vem uma versão nova do Deplhi e algumas coisas são incompativeis, porque não é mais DBX e sim Firedac ou outro. As vezes aquele componente legal que fazia as coisas de forma simples não tem para a versão mais nova e ai começam as dores de cabeça.

## Retorne você mesmo

Umas das maravilhas da programação se chama encadeamento (chaining). Imagina que você tem uma classe de conexão, onde você precisa configurar os dados de conexão e depois abrir a conexão, fazer algo e fechar a conexão. Ficaria mais ou menos assim:

```delphi
// definição
TConexao = class
public
  constructor Create;
  destructor Destroy; override;
  
  procedure EnderecoServidor(AValue: string);
  procedure PortaBanco(AValue: Integer);
  procedure Conectar;
  procedure FazerAlgo;
  procedure Desconectar;

implementation

constructor TConexao.Create;
begin

end;

procedure TConexao.EnderecoServidor(AValue: string);
begin
  // Lógica aqui
end;

procedure TConexao.PortaBanco(AValue: Integer);
begin
  // Lógica aqui
end;

procedure TConexao.Conectar;
begin
  // Lógica aqui
end;

procedure TConexao.FazerAlgo;
begin
  // Lógica aqui
end;

procedure TConexao.Desconectar;
begin
  // Lógica aqui
end;
end

// uso
var
  LConexao: TConexao;
begin
  LConexao := TConexao.Create;
  LConexao.EnderecoServidor('localhost');
  LConexao.PortaBanco(5432);
  LConexao.Conectar;
  LConexao.FazerAlgo;
  LConexao.Desconectar;
  LConexao.Free;
end;
```

Agora usando encadeamento
```delphi
// definição
TConexao = class
public
  constructor Create;
  destructor Destroy; override;
  class function Iniciar: TConexao;

  
  function EnderecoServidor(AValue: string): TConexao;
  function PortaBanco(AValue: Integer): TConexao;
  function Conectar: TConexao;
  function FazerAlgo: TConexao;
  function Desconectar: TConexao;

implementation

constructor TConexao.Create;
begin

end;

class function TConexao.Iniciar: TConexao;
begin
  Result := Self.Create;
end;

function TConexao.EnderecoServidor(AValue: string): TConexao;
begin
  Result := Self;
  // Lógica aqui
end;

function TConexao.PortaBanco(AValue: Integer): TConexao;
begin
  Result := Self;
  // Lógica aqui
end;

function TConexao.Conectar: TConexao;
begin
  Result := Self;
  // Lógica aqui
end;

function TConexao.FazerAlgo: TConexao;
begin
  Result := Self;
  // Lógica aqui
end;

function TConexao.Desconectar: TConexao;
begin
  Result := Self;
  // Lógica aqui
end;

end

// uso
var
  LConexao: TConexao;
begin
  LConexao := TConexao.Create;
  LConexao
    .EnderecoServidor('localhost')
    .PortaBanco(5432)
    .Conectar
    .FazerAlgo
    .Desconectar
    .Free;
end;
```

Mudando as procedures por functions para ter um retorno e que o retorno seja a propria classe você consegue fazer o encadeamento e eu pessoalmente gosto do resultado. Depois usando interfaces a coisa fica mais "elegante" ainda.

## Planeje com interfaces

Uma das tecnicas mais odiadas e amadas por programadores são as interfaces. Resumindo grosseiramente, são contratos, que a classe deve seguir durante a implementação. É um resumo do que devera ter de metodos e propriedades. Meu primeiro contato com interfaces foi em C# e a primeira pergunta que veio a mente foi. PRA QUE ISSU?! Se eu já vou implementar pra que eu preciso de um arquivo a mais só para dizer o que vai ter? Ai que vem a coisa boa, durante a utilização do codigo, você expoe a interface que tem só o que realmente precisa metodos e propriedades e isso simplifica muito a vida.

Uma coisa legal é você conseguir planejar seu código com as interfaces. Em um projeto atual, estou trabalhando com transferência de estoque onde o cliente necessita que o processo seja parcial. É feito o envio da mercadoria (saída do estoque) e não pode entrar automaticamente no destino, tem que ter uma rotina de confirmação que essa transferência realmente chegou lá e que todos os produtos foram conferidos e estão nas quantidades corretas. Fora isso ainda tem as etapas fiscais, contábeis que são necessárias.

Pensando em interface, no caso do delphi já da pra entender o que vai precisar ser implementado.

```delphi
  TDocumentoGerado = record
    Id: Integer;
    Data: DateTime;
    NF: Integer;
  end;

  iEstoqueTransferencia = interface
    ['{80C72BB0-B594-4C89-95A7-024CB446D0DC}']
    function Enviar(ATransferencia: Integer): iEstoqueTransferencia;
    function Confirmar(ATransferencia: Integer): iEstoqueTransferencia;
    function Estornar(ATransferencia: Integer): iEstoqueTransferencia;
    function DocumentoGerado: TDocumentoGerado;
  end;
```

Acumulando o que vimos anteriormente de encadeamento, junto com interfaces, podemos fazer o seguinte.


```delphi
  TEstoqueTransferencia = class(TInterfacedObject, iEstoqueTransferencia)
  private
    FDocumentoGerado: TDocumentoGerado; 
  public
    constructor Create;
    destructor Destroy; override;
    class function Iniciar: iEstoqueTransferencia;
    
    function Enviar(ATransferencia: Integer): iEstoqueTransferencia;
    function Confirmar(ATransferencia: Integer): iEstoqueTransferencia;
    function Estornar(ATransferencia: Integer): iEstoqueTransferencia;
    function DocumentoGerado: TDocumentoGerado;
  end;

implementation

constructor TEstoqueTransferencia.Create;
begin

end;

destructor TEstoqueTransferencia.Destroy;
begin
  inherited;
end;

function TEstoqueTransferencia.Enviar(ATransferencia: Integer): iEstoqueTransferencia;
begin
  Result := Self;
  // Logica aqui
end;

function TEstoqueTransferencia.Confirmar(ATransferencia: Integer): iEstoqueTransferencia;
begin
  Result := Self;
  // Logica aqui
end;

function TEstoqueTransferencia.Estornar(ATransferencia: Integer): iEstoqueTransferencia;
begin
  Result := Self;
  // Logica aqui
end;

function TEstoqueTransferencia.DocumentoGerado: TDocumentoGerado;
begin
  Result := FDocumentoGerado;
end;
```

Agora o uso era só encadear tudo e ser feliz.

```delphi
  TEstoqueTransferencia
    .Iniciar
    .Enviar
    .DocumentoGerado;

  TEstoqueTransferencia
    .Iniciar
    .Confirmar
    .DocumentoGerado;
```

O Melhor de tudo, que usando interface, você não precisa se preocupar com limpar a instancia da memória, pois logo após finalizar a utilização ele vai fazer isso de forma automática.