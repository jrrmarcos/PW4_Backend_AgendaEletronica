CREATE DATABASE agendaEletronica; 

USE agendaEletronica; 

CREATE TABLE `usuario` (
  `id` int(10) AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(10) NOT NULL,  
  `admin` boolean DEFAULT false,
  CONSTRAINT usuario_pk primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `contato` (
  `id` int(10) AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telefone` varchar(40) DEFAULT NULL,
  `endereco` varchar(200) DEFAULT NULL,  
  `contato_id` int(11) NOT NULL,
  CONSTRAINT contato_pk primary key (id),
  CONSTRAINT `contato_contatoid_fk` FOREIGN KEY (`contato_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `compromisso` (
  `id` int(10) AUTO_INCREMENT,
  `data` datetime NOT NULL,
  `observacao` text DEFAULT NULL,
  `participantes` text DEFAULT NULL,
  `endereco` varchar(200) DEFAULT NULL,  
  `status` varchar(50) DEFAULT NULL,
  `contato_id` int(10) NOT NULL,
  CONSTRAINT compromisso_pk primary key (id),
  CONSTRAINT `compromisso_contatoid_fk` FOREIGN KEY (`contato_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;