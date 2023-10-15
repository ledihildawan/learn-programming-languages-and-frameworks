# IT Security

Confidentiality - Only authorized people have access
Integrity - Data must not be changed in transit
Availability - Consistently accessible for authorized parties


## Abbr

GDPR
FISMA
HIPPA
PCI DSS
SID
PAM

## Type of Controls

- Technical Control
Firewall, IDS, IPS, Antivirus...
- Administrative Control
Expected risk, lowering risk...
- Operational Control
Educating or training employees
- Pyhysical Control 
Security badges, cameras, alarams...

## Access Control

Identity Provider (IDP)

---

1. Identification
2. Authentication
3. Authorization
4. Accunting
5. 
---

1. Usernames
Name fot the individuals account
1. Attributes
Unique property in users account
1. Smart Cards
Physical card with unique certificate embedded
1. Certificates
Digital cerificate with 2 created keys
1. Tokens
Digital token (SAML Token for Federation Service)
1. SSH Keys
ssh-keygen -t RSA
1. Private Keys
openssl genrsa -out rsa.private 4096

---

1. Mandatory Access Control (MAC)
Limiting access to resources based on the sensitivity of information (Top Secret, Secret, Confidential, Restricted).
2. Discretionary Access Control (DAC)
Restricting access to objects based on the identify of subject.
3. Rule Based Access Control (RBAC)
High level rules which determine how, where and when employee can access spaces or resources.
4. Attribute Based Access Control (ABAC)
Evaluates attributes rather than roles to determine access.
5. Group Based Access Control (GBAC)
Give access to group of individuals to the data that they need.

---

Presentive Controls
Corrective Controls
Compensating Controls
   

*) Granted or 

### Type of Accounts

- User Account
Limited access, 2 types (loca, domain), can not install.
- Administrator Account
Configure, install and manage, elevated privilege.
- Privileged Account
More access than standard user accounts
- Service Account
Type of admin account used for running software or application
- Guest Account
Rarely used in companies, access without an account created
- Sponsored Guest Account
Used for persentations, for speech..
- Shared Account
Multiple individuals use it to perform same task.
- Generic Accounts
For range of devices (IoT, Network Devices), by manufacturer