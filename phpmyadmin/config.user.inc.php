 <?php
//  este file va a extender la config que ya tenga php-my-admin
   $i++;
   $cfg['Servers'][$i]['verbose'] = 'chat-service';
   $cfg['Servers'][$i]['host'] = 'chat-service-db';
   $cfg['Servers'][$i]['port'] = '';
   $cfg['Servers'][$i]['socket'] = '';
   $cfg['Servers'][$i]['connect_type'] = 'tcp';
   $cfg['Servers'][$i]['extension'] = 'mysqli';
   $cfg['Servers'][$i]['auth_type'] = 'config';
   $cfg['Servers'][$i]['user'] = 'root';
   $cfg['Servers'][$i]['password'] = 'password';
   $cfg['Servers'][$i]['AllowNoPassword'] = false;
  //  duplicar por cada servicio
   $i++;
   $cfg['Servers'][$i]['verbose'] = 'users-service';
   $cfg['Servers'][$i]['host'] = 'users-service-db';
   $cfg['Servers'][$i]['port'] = '';
   $cfg['Servers'][$i]['socket'] = '';
   $cfg['Servers'][$i]['connect_type'] = 'tcp';
   $cfg['Servers'][$i]['extension'] = 'mysqli';
   $cfg['Servers'][$i]['auth_type'] = 'config';
   $cfg['Servers'][$i]['user'] = 'root';
   $cfg['Servers'][$i]['password'] = 'password';
   $cfg['Servers'][$i]['AllowNoPassword'] = false;