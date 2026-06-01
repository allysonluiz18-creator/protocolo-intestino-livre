# Superpowers Plugin para OpenCode

O plugin Superpowers foi instalado e configurado.

## Instalação concluída

1. **Node.js** instalado via winget
2. **Git** instalado via winget
3. **OpenCode** instalado globalmente via npm
4. **Superpowers** instalado em `~/.config/opencode/node_modules/superpowers`
5. **Configuração** atualizada em `opencode.json`

## Próximos passos

1. **Reinicie o terminal** para atualizar o PATH
2. **Execute o OpenCode** no diretório do projeto:
   ```bash
   opencode
   ```
3. **Verifique as skills** perguntando:
   ```
   Tell me about your superpowers
   ```

## Uso das skills

```
use skill tool to list skills
use skill tool to load superpowers/brainstorming
```

## Solução de problemas

- Verifique os logs: `opencode run --print-logs "hello" 2>&1 | findstr superpowers`
- Consulte a documentação: https://github.com/obra/superpowers/blob/main/docs/README.opencode.md