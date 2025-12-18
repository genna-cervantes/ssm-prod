-- Custom SQL migration file, put your code below! --

INSERT INTO "roles" ("role", "permissions")
VALUES
  ('admin', 
  ARRAY['articles:read','articles:write','publications:read','publications:write','petitions:read','petitions:write','notes:read','notes:write']::text[]),
  ('super_admin', 
  ARRAY['articles:read','articles:write','publications:read','publications:write','petitions:read','petitions:write','notes:read','notes:write','user:read','user:write']::text[]);
