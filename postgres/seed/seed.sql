-- Seed data with a fake user for testing

INSERT INTO users (name, email, entries, joined) values ('teston', 'teston@gmail.com', '3', '2018-01-01');
INSERT INTO login (hash, email) values ('$2a$10$DwcfmLG.VFTgviZIarfQHO7r5GoIcdKqD852lhQRRJLM86KHAmWHq', 'teston@gmail.com');