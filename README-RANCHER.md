# Instruções para usar o projeto com Rancher Desktop

## Pré-requisitos
1. Instalar o Rancher Desktop a partir do site oficial: https://rancherdesktop.io/
2. Configurar o Rancher Desktop para usar o motor dockerd/moby para compatibilidade total com Docker

## Como executar o projeto
1. Abra o Rancher Desktop e certifique-se de que está configurado e em execução
2. Abra um terminal na pasta raiz do projeto
3. Execute o script batch fornecido:
   ```
   start-rancher.bat
   ```
   
   Ou execute o comando manualmente:
   ```
   nerdctl compose -f rancher-compose.yml up -d
   ```
   Ou se estiver usando o motor dockerd/moby:
   ```
   docker compose -f rancher-compose.yml up -d
   ```

## Verificar os serviços
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Comandos úteis

### Usando scripts batch (recomendado)
- Para iniciar os serviços: `start-rancher.bat`
- Para parar os serviços: `stop-rancher.bat`
- Para testar o banco de dados MySQL: `test-mysql.bat`

### Usando comandos manuais
- Para parar os serviços:
  ```
  nerdctl compose -f rancher-compose.yml down
  ```
  Ou com dockerd/moby:
  ```
  docker compose -f rancher-compose.yml down
  ```

- Para visualizar logs:
  ```
  nerdctl compose -f rancher-compose.yml logs -f
  ```
  Ou com dockerd/moby:
  ```
  docker compose -f rancher-compose.yml logs -f
  ```

- Para reconstruir os serviços:
  ```
  nerdctl compose -f rancher-compose.yml build
  ```
  Ou com dockerd/moby:
  ```
  docker compose -f rancher-compose.yml build
  ```

## Observações
- O Rancher Desktop é compatível com os mesmos comandos do Docker, apenas substituindo `docker` por `nerdctl` quando estiver usando o motor containerd
- Se estiver usando o motor dockerd/moby no Rancher Desktop, você pode continuar usando os comandos `docker` normalmente
- Os scripts batch (.bat) detectam automaticamente qual motor você está usando e executam o comando apropriado