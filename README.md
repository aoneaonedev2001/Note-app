


#  Note Easy (react,nodejs)


## code create database table

```
-- สร้างตาราง Customer (ข้อมูลลูกค้า)
CREATE TABLE Customer (
  customer_id VARCHAR(255) PRIMARY KEY,
  customer_name VARCHAR(255),
  password VARCHAR(255)
);

-- สร้างตาราง Note (บันทึก)
CREATE TABLE Note (
  note_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  created_at DATETIME,
  updated_at DATETIME, 
  customer_id VARCHAR(255),
  category_id INT,
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
  FOREIGN KEY (category_id) REFERENCES CategoryNote(category_id)
);


-- สร้างตาราง Category Note (หมวดหมู่ของบันทึก)
CREATE TABLE CategoryNote (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255)
);

-- เพิ่มข้อมูลเริ่มต้นในตาราง Category Note
INSERT INTO CategoryNote (category_name) VALUES ('งาน'), ('การเรียน'), ('อื่นๆ');


```




## Installation

### client
```
npm install
```
```
npm start
```
### server
```
npm install
```
```
npm start
```


## Screenshots
Login Page:
![enter image description here](https://github.com/AoneDev2001/Note-Easy/blob/main/client/public/Demo%20Note%20Easy/Login1.png?raw=true)

Register Page:
![enter image description here](https://github.com/AoneDev2001/Note-Easy/blob/main/client/public/Demo%20Note%20Easy/Register.png?raw=true)

Main Page:
![enter image description here](https://github.com/AoneDev2001/Note-Easy/blob/main/client/public/Demo%20Note%20Easy/My%20Note.png?raw=true)

All note Page:
![enter image description here](https://github.com/AoneDev2001/Note-Easy/blob/main/client/public/Demo%20Note%20Easy/All%20Note.png?raw=true)

New note Page:
![enter image description here](https://github.com/AoneDev2001/Note-Easy/blob/main/client/public/Demo%20Note%20Easy/New%20note.png?raw=true)
