CREATE TABLE notificacoes (
  id SERIAL PRIMARY KEY,
  descricao TEXT
);

-- Criar uma função para disparar notificações
CREATE OR REPLACE FUNCTION notify_on_change() 
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('notificacoes', 'alterado');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar o trigger
CREATE TRIGGER trigger_notificacao
AFTER INSERT OR UPDATE OR DELETE ON notificacoes
FOR EACH ROW EXECUTE FUNCTION notify_on_change();
