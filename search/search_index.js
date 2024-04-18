var __index = {"config":{"lang":["pt"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"index.html","title":"Docs do William","text":"<p>Escrevo nesse site para ter uma fonte fora da cabe\u00e7a de situa\u00e7\u00f5es que passei, problemas que foram resolvidos e com o objetivo de compartilhar algum conhecimento com amigos e outros programadores.</p>"},{"location":"blog/index.html","title":"William Galleti Blog","text":""},{"location":"blog/2024/04/16/delphi.html","title":"Delphi","text":"<p>Durante minha carrreira de desenvolvimento, algumas das solu\u00e7\u00f5es mais impactantes foram desenvolvidas em delphi, entre elas, algumas coisas relacionadas ao fluxo de algod\u00e3o (industria) entre outros projetos satelites para ERP. Com essa tecnologia (muitas vezes julgada) eu conseguia prototipar coisas de forma rapida e as vezes o prot\u00f3tipo ficava t\u00e3o funcional que n\u00e3o evoluia o projeto para o que eu queria (criar classes, padronizar c\u00f3digo e etc). Dessa forma eu fui acumulando alguns conhecimentos da ferramenta delphi e n\u00e3o da linguagem. Hoje, eu entendo que por mais rapido que um prot\u00f3tipo seja e que seja funcional, \u00e9 extremamente importante come\u00e7ar de uma forma que permita seu projeto evoluir (temos um nome bonito, escalar). Quando se desenvolve para em uma equipe de um unico dev, tudo \u00e9 simples, agora quando temos 2 ou mais devs, padrozinar \u00e9 importante para a sa\u00fade do projeto e dos devs (sai at\u00e9 porrada).</p> <p>Vou deixar registrado aqui algumas dicas importantes que mudaram minha forma de trabalhar com a tecnologia e alguns conceitos que aprendi e sigo aplicando em projetos.</p>"},{"location":"blog/2024/04/16/delphi.html#tldr","title":"TL;DR","text":"<ul> <li>O Arrasta e solta \u00e9 igual cart\u00e3o de cr\u00e9dito, uma hora voc\u00ea vai pagar.</li> <li>Retorne voc\u00ea mesmo</li> <li>Planeje com interfaces</li> <li>Limpe sua mem\u00f3ria (Em breve)</li> <li>Repetiu 3 vezes, padronize (Em breve)</li> <li>Composi\u00e7\u00e3o \u00e9 muito legal (Em breve)</li> <li>Pense simples (Simples n\u00e3o \u00e9 f\u00e1cil) (Em breve)</li> <li>Separe responsabilidades (Em breve)</li> </ul>"},{"location":"blog/2024/04/16/delphi.html#o-arrasta-e-solta-e-igual-cartao-de-credito-uma-hora-voce-vai-pagar","title":"O Arrasta e solta \u00e9 igual cart\u00e3o de cr\u00e9dito, uma hora voc\u00ea vai pagar","text":"<p>Os meus primeiros projetos foram muito legais, tipo eu vi um video, tinha um delphi e um sonho, ser programador. File, new, Vcl Windows Application, arrasta ali os componentes de conex\u00e3o, dataset, datasource, grid, F9 e t\u00e1 feito a aplica\u00e7\u00e3o. Seu cliete fica satisfeito porque foi r\u00e1pido e eficiente e voc\u00ea aproveitou o poder do RAD (Rappid application Development). De repente, temos 10 telas iguais, e descobrimos um novo componente de conex\u00e3o. Pronto, t\u00e1 feito um d\u00e9bito t\u00e9cnico gigante e que provavelmente n\u00e3o vai ser solucionado (Vai ser trocado os componentes nas telas e o problema pode ocorrer novamente caso encontre um novo componente).</p> <p>Isso \u00e9 o mais comum em projetos delphi, essa prototipa\u00e7\u00e3o rapida e simples, se torna algo extremamente dificil de manter atualizado e dar manuten\u00e7\u00e3o. De repente vem uma vers\u00e3o nova do Deplhi e algumas coisas s\u00e3o incompativeis, porque n\u00e3o \u00e9 mais DBX e sim Firedac ou outro. As vezes aquele componente legal que fazia as coisas de forma simples n\u00e3o tem para a vers\u00e3o mais nova e ai come\u00e7am as dores de cabe\u00e7a.</p>"},{"location":"blog/2024/04/16/delphi.html#retorne-voce-mesmo","title":"Retorne voc\u00ea mesmo","text":"<p>Umas das maravilhas da programa\u00e7\u00e3o se chama encadeamento (chaining). Imagina que voc\u00ea tem uma classe de conex\u00e3o, onde voc\u00ea precisa configurar os dados de conex\u00e3o e depois abrir a conex\u00e3o, fazer algo e fechar a conex\u00e3o. Ficaria mais ou menos assim:</p> Delphi<pre><code>// defini\u00e7\u00e3o\nTConexao = class\npublic\n  constructor Create;\n  destructor Destroy; override;\n\n  procedure EnderecoServidor(AValue: string);\n  procedure PortaBanco(AValue: Integer);\n  procedure Conectar;\n  procedure FazerAlgo;\n  procedure Desconectar;\n\nimplementation\n\nconstructor TConexao.Create;\nbegin\n\nend;\n\nprocedure TConexao.EnderecoServidor(AValue: string);\nbegin\n  // L\u00f3gica aqui\nend;\n\nprocedure TConexao.PortaBanco(AValue: Integer);\nbegin\n  // L\u00f3gica aqui\nend;\n\nprocedure TConexao.Conectar;\nbegin\n  // L\u00f3gica aqui\nend;\n\nprocedure TConexao.FazerAlgo;\nbegin\n  // L\u00f3gica aqui\nend;\n\nprocedure TConexao.Desconectar;\nbegin\n  // L\u00f3gica aqui\nend;\nend\n\n// uso\nvar\n  LConexao: TConexao;\nbegin\n  LConexao := TConexao.Create;\n  LConexao.EnderecoServidor('localhost');\n  LConexao.PortaBanco(5432);\n  LConexao.Conectar;\n  LConexao.FazerAlgo;\n  LConexao.Desconectar;\n  LConexao.Free;\nend;\n</code></pre> <p>Agora usando encadeamento Delphi<pre><code>// defini\u00e7\u00e3o\nTConexao = class\npublic\n  constructor Create;\n  destructor Destroy; override;\n  class function Iniciar: TConexao;\n\n\n  function EnderecoServidor(AValue: string): TConexao;\n  function PortaBanco(AValue: Integer): TConexao;\n  function Conectar: TConexao;\n  function FazerAlgo: TConexao;\n  function Desconectar: TConexao;\n\nimplementation\n\nconstructor TConexao.Create;\nbegin\n\nend;\n\nclass function TConexao.Iniciar: TConexao;\nbegin\n  Result := Self.Create;\nend;\n\nfunction TConexao.EnderecoServidor(AValue: string): TConexao;\nbegin\n  Result := Self;\n  // L\u00f3gica aqui\nend;\n\nfunction TConexao.PortaBanco(AValue: Integer): TConexao;\nbegin\n  Result := Self;\n  // L\u00f3gica aqui\nend;\n\nfunction TConexao.Conectar: TConexao;\nbegin\n  Result := Self;\n  // L\u00f3gica aqui\nend;\n\nfunction TConexao.FazerAlgo: TConexao;\nbegin\n  Result := Self;\n  // L\u00f3gica aqui\nend;\n\nfunction TConexao.Desconectar: TConexao;\nbegin\n  Result := Self;\n  // L\u00f3gica aqui\nend;\n\nend\n\n// uso\nvar\n  LConexao: TConexao;\nbegin\n  LConexao := TConexao.Create;\n  LConexao\n    .EnderecoServidor('localhost')\n    .PortaBanco(5432)\n    .Conectar\n    .FazerAlgo\n    .Desconectar\n    .Free;\nend;\n</code></pre></p> <p>Mudando as procedures por functions para ter um retorno e que o retorno seja a propria classe voc\u00ea consegue fazer o encadeamento e eu pessoalmente gosto do resultado. Depois usando interfaces a coisa fica mais \"elegante\" ainda.</p>"},{"location":"blog/2024/04/16/delphi.html#planeje-com-interfaces","title":"Planeje com interfaces","text":"<p>Uma das tecnicas mais odiadas e amadas por programadores s\u00e3o as interfaces. Resumindo grosseiramente, s\u00e3o contratos, que a classe deve seguir durante a implementa\u00e7\u00e3o. \u00c9 um resumo do que devera ter de metodos e propriedades. Meu primeiro contato com interfaces foi em C# e a primeira pergunta que veio a mente foi. PRA QUE ISSU?! Se eu j\u00e1 vou implementar pra que eu preciso de um arquivo a mais s\u00f3 para dizer o que vai ter? Ai que vem a coisa boa, durante a utiliza\u00e7\u00e3o do codigo, voc\u00ea expoe a interface que tem s\u00f3 o que realmente precisa metodos e propriedades e isso simplifica muito a vida.</p> <p>Uma coisa legal \u00e9 voc\u00ea conseguir planejar seu c\u00f3digo com as interfaces. Em um projeto atual, estou trabalhando com transfer\u00eancia de estoque onde o cliente necessita que o processo seja parcial. \u00c9 feito o envio da mercadoria (sa\u00edda do estoque) e n\u00e3o pode entrar automaticamente no destino, tem que ter uma rotina de confirma\u00e7\u00e3o que essa transfer\u00eancia realmente chegou l\u00e1 e que todos os produtos foram conferidos e est\u00e3o nas quantidades corretas. Fora isso ainda tem as etapas fiscais, cont\u00e1beis que s\u00e3o necess\u00e1rias.</p> <p>Pensando em interface, no caso do delphi j\u00e1 da pra entender o que vai precisar ser implementado.</p> Delphi<pre><code>  TDocumentoGerado = record\n    Id: Integer;\n    Data: DateTime;\n    NF: Integer;\n  end;\n\n  iEstoqueTransferencia = interface\n    ['{80C72BB0-B594-4C89-95A7-024CB446D0DC}']\n    function Enviar(ATransferencia: Integer): iEstoqueTransferencia;\n    function Confirmar(ATransferencia: Integer): iEstoqueTransferencia;\n    function Estornar(ATransferencia: Integer): iEstoqueTransferencia;\n    function DocumentoGerado: TDocumentoGerado;\n  end;\n</code></pre> <p>Acumulando o que vimos anteriormente de encadeamento, junto com interfaces, podemos fazer o seguinte.</p> Delphi<pre><code>  TEstoqueTransferencia = class(TInterfacedObject, iEstoqueTransferencia)\n  private\n    FDocumentoGerado: TDocumentoGerado; \n  public\n    constructor Create;\n    destructor Destroy; override;\n    class function Iniciar: iEstoqueTransferencia;\n\n    function Enviar(ATransferencia: Integer): iEstoqueTransferencia;\n    function Confirmar(ATransferencia: Integer): iEstoqueTransferencia;\n    function Estornar(ATransferencia: Integer): iEstoqueTransferencia;\n    function DocumentoGerado: TDocumentoGerado;\n  end;\n\nimplementation\n\nconstructor TEstoqueTransferencia.Create;\nbegin\n\nend;\n\ndestructor TEstoqueTransferencia.Destroy;\nbegin\n  inherited;\nend;\n\nfunction TEstoqueTransferencia.Enviar(ATransferencia: Integer): iEstoqueTransferencia;\nbegin\n  Result := Self;\n  // Logica aqui\nend;\n\nfunction TEstoqueTransferencia.Confirmar(ATransferencia: Integer): iEstoqueTransferencia;\nbegin\n  Result := Self;\n  // Logica aqui\nend;\n\nfunction TEstoqueTransferencia.Estornar(ATransferencia: Integer): iEstoqueTransferencia;\nbegin\n  Result := Self;\n  // Logica aqui\nend;\n\nfunction TEstoqueTransferencia.DocumentoGerado: TDocumentoGerado;\nbegin\n  Result := FDocumentoGerado;\nend;\n</code></pre> <p>Agora o uso era s\u00f3 encadear tudo e ser feliz.</p> Delphi<pre><code>  TEstoqueTransferencia\n    .Iniciar\n    .Enviar\n    .DocumentoGerado;\n\n  TEstoqueTransferencia\n    .Iniciar\n    .Confirmar\n    .DocumentoGerado;\n</code></pre> <p>O Melhor de tudo, que usando interface, voc\u00ea n\u00e3o precisa se preocupar com limpar a instancia da mem\u00f3ria, pois logo ap\u00f3s finalizar a utiliza\u00e7\u00e3o ele vai fazer isso de forma autom\u00e1tica.</p>"},{"location":"blog/archive/2024.html","title":"2024","text":""},{"location":"blog/category/delphi.html","title":"Delphi","text":""}]}