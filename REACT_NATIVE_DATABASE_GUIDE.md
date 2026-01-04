# React Native Database Options - Complete Guide

## 📱 Overview
React Native-এ data store করার জন্য বিভিন্ন database option আছে। এখানে সব popular options-এর বিস্তারিত guide।

---

## 🗄️ Local Database Options

### 1. **AsyncStorage** (Built-in)
**কখন ব্যবহার করবেন**: Simple key-value data storage

**Installation**:
```bash
npm install @react-native-async-storage/async-storage
# or for Expo
expo install @react-native-async-storage/async-storage
```

**Usage Example**:
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving:', error);
  }
};

// Get data
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error reading:', error);
  }
};

// Remove data
const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing:', error);
  }
};
```

**Pros**:
- ✅ Built-in, no extra setup
- ✅ Simple API
- ✅ Good for small data

**Cons**:
- ❌ Not for complex queries
- ❌ Slower for large data
- ❌ No relationships

---

### 2. **SQLite** (Relational Database)

#### Option A: react-native-sqlite-storage
**Installation**:
```bash
npm install react-native-sqlite-storage
```

**Usage Example**:
```javascript
import SQLite from 'react-native-sqlite-storage';

// Open database
const db = SQLite.openDatabase(
  { name: 'ShebaDB.db', location: 'default' },
  () => console.log('Database opened'),
  error => console.error('Database error:', error)
);

// Create table
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT)',
    [],
    () => console.log('Table created'),
    error => console.error('Error:', error)
  );
});

// Insert data
const insertTeacher = (name, email, phone) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO teachers (name, email, phone) VALUES (?, ?, ?)',
      [name, email, phone],
      (tx, results) => console.log('Inserted:', results.insertId),
      error => console.error('Error:', error)
    );
  });
};

// Get data
const getTeachers = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM teachers',
      [],
      (tx, results) => {
        const teachers = [];
        for (let i = 0; i < results.rows.length; i++) {
          teachers.push(results.rows.item(i));
        }
        callback(teachers);
      },
      error => console.error('Error:', error)
    );
  });
};
```

#### Option B: expo-sqlite (Expo projects)
**Installation**:
```bash
expo install expo-sqlite
```

**Usage Example**:
```javascript
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('ShebaDB.db');

// Create table
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)'
  );
});

// Insert
db.transaction(tx => {
  tx.executeSql('INSERT INTO teachers (name, email) VALUES (?, ?)', ['John', 'john@email.com']);
});
```

**Pros**:
- ✅ Relational database
- ✅ Complex queries
- ✅ Good performance
- ✅ ACID compliant

**Cons**:
- ❌ More complex setup
- ❌ Need SQL knowledge

---

### 3. **Realm** (Object Database)
**Installation**:
```bash
npm install realm
```

**Usage Example**:
```javascript
import Realm from 'realm';

// Define schema
const TeacherSchema = {
  name: 'Teacher',
  properties: {
    id: 'string',
    name: 'string',
    email: 'string',
    phone: 'string',
    subjects: 'string[]',
    rating: 'double',
  },
  primaryKey: 'id',
};

// Open realm
const realm = new Realm({ schema: [TeacherSchema] });

// Write data
realm.write(() => {
  realm.create('Teacher', {
    id: '1',
    name: 'ড. রহমান আহমেদ',
    email: 'rahman@example.com',
    phone: '+8801712345678',
    subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
    rating: 4.9,
  });
});

// Query data
const teachers = realm.objects('Teacher');
const mathTeachers = realm.objects('Teacher').filtered('subjects CONTAINS "গণিত"');

// Update
realm.write(() => {
  const teacher = realm.objectForPrimaryKey('Teacher', '1');
  teacher.rating = 5.0;
});

// Delete
realm.write(() => {
  const teacher = realm.objectForPrimaryKey('Teacher', '1');
  realm.delete(teacher);
});
```

**Pros**:
- ✅ Fast performance
- ✅ Object-oriented
- ✅ Real-time updates
- ✅ Good for complex data

**Cons**:
- ❌ Larger bundle size
- ❌ Learning curve
- ❌ License considerations

---

### 4. **WatermelonDB** (Scalable SQLite)
**Installation**:
```bash
npm install @nozbe/watermelondb
npm install @nozbe/with-observables
```

**Usage Example**:
```javascript
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schema, appSchema, tableSchema } from '@nozbe/watermelondb';

// Define schema
const teacherSchema = tableSchema({
  name: 'teachers',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string', isIndexed: true },
    { name: 'phone', type: 'string' },
    { name: 'rating', type: 'number' },
  ],
});

const mySchema = appSchema({
  version: 1,
  tables: [teacherSchema],
});

// Create adapter
const adapter = new SQLiteAdapter({
  schema: mySchema,
});

// Create database
const database = new Database({
  adapter,
  modelClasses: [Teacher],
});

// Define model
import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

class Teacher extends Model {
  static table = 'teachers';
  
  @field('name') name;
  @field('email') email;
  @field('phone') phone;
  @field('rating') rating;
}

// Use
const teachers = await database.collections.get('teachers').query().fetch();
```

**Pros**:
- ✅ Very fast
- ✅ Observable (reactive)
- ✅ Scalable
- ✅ Good for large apps

**Cons**:
- ❌ Complex setup
- ❌ Steeper learning curve

---

## ☁️ Cloud/Backend Databases

### 1. **Firebase Firestore**
**Installation**:
```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/firestore
```

**Usage Example**:
```javascript
import firestore from '@react-native-firebase/firestore';

// Add data
const addTeacher = async (teacherData) => {
  try {
    await firestore()
      .collection('teachers')
      .add({
        name: teacherData.name,
        email: teacherData.email,
        phone: teacherData.phone,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error('Error:', error);
  }
};

// Get data
const getTeachers = async () => {
  try {
    const snapshot = await firestore()
      .collection('teachers')
      .where('verified', '==', true)
      .orderBy('rating', 'desc')
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error:', error);
  }
};

// Real-time updates
const subscribeToTeachers = (callback) => {
  return firestore()
    .collection('teachers')
    .onSnapshot(snapshot => {
      const teachers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(teachers);
    });
};
```

**Pros**:
- ✅ Real-time sync
- ✅ Offline support
- ✅ Easy setup
- ✅ Scalable

**Cons**:
- ❌ Costs at scale
- ❌ Vendor lock-in

---

### 2. **Supabase** (PostgreSQL)
**Installation**:
```bash
npm install @supabase/supabase-js
```

**Usage Example**:
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_URL', 'YOUR_KEY');

// Insert
const addTeacher = async (teacherData) => {
  const { data, error } = await supabase
    .from('teachers')
    .insert([teacherData]);
  
  if (error) console.error('Error:', error);
  return data;
};

// Select
const getTeachers = async () => {
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .eq('verified', true)
    .order('rating', { ascending: false });
  
  if (error) console.error('Error:', error);
  return data;
};

// Real-time
supabase
  .channel('teachers')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'teachers' },
    (payload) => {
      console.log('New teacher:', payload.new);
    }
  )
  .subscribe();
```

**Pros**:
- ✅ PostgreSQL (powerful)
- ✅ Real-time
- ✅ Open source
- ✅ Good free tier

---

### 3. **MongoDB Realm** (MongoDB Atlas)
**Installation**:
```bash
npm install realm
```

**Usage Example**:
```javascript
import Realm from 'realm';

const app = new Realm.App({ id: 'YOUR_APP_ID' });

// Sync with MongoDB Atlas
const config = {
  schema: [TeacherSchema],
  sync: {
    user: app.currentUser,
    partitionValue: 'public',
  },
};

const realm = await Realm.open(config);
```

---

## 🔄 State Management + Persistence

### Redux Persist
**Installation**:
```bash
npm install redux react-redux redux-persist
```

**Usage Example**:
```javascript
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
```

---

## 📊 Comparison Table

| Database | Best For | Performance | Complexity | Offline |
|----------|----------|-------------|------------|---------|
| AsyncStorage | Simple data | Medium | Low | ✅ |
| SQLite | Relational data | High | Medium | ✅ |
| Realm | Complex objects | Very High | Medium | ✅ |
| WatermelonDB | Large apps | Very High | High | ✅ |
| Firebase | Real-time sync | High | Low | ✅ |
| Supabase | PostgreSQL needs | High | Medium | ✅ |

---

## 🎯 Recommendations for ShebaBD Project

### Current (React Web):
- ✅ localStorage (working well)

### If Converting to React Native:

**Option 1: Simple Migration**
- Use **AsyncStorage** (similar to localStorage)
- Easy migration
- Good for MVP

**Option 2: Better Performance**
- Use **SQLite** (react-native-sqlite-storage)
- Better for complex queries
- Good for production

**Option 3: Best Performance**
- Use **WatermelonDB** or **Realm**
- Best for large scale
- More complex setup

**Option 4: Cloud Backend**
- Use **Firebase** or **Supabase**
- Real-time sync
- Multi-device support
- Better for production apps

---

## 💡 Migration Strategy

### From localStorage to AsyncStorage:
```javascript
// Current (Web)
localStorage.setItem('teachers', JSON.stringify(teachers));

// React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.setItem('teachers', JSON.stringify(teachers));
```

### From localStorage to SQLite:
```javascript
// Create migration script
const migrateToSQLite = async () => {
  const teachers = JSON.parse(await AsyncStorage.getItem('teachers'));
  
  db.transaction(tx => {
    teachers.forEach(teacher => {
      tx.executeSql(
        'INSERT INTO teachers (id, name, email, phone) VALUES (?, ?, ?, ?)',
        [teacher.id, teacher.name, teacher.email, teacher.phone]
      );
    });
  });
};
```

---

## 📝 Code Examples for ShebaBD

### Using AsyncStorage (Simple):
```javascript
// Save teacher
const saveTeacher = async (teacher) => {
  try {
    const existing = await AsyncStorage.getItem('teachers');
    const teachers = existing ? JSON.parse(existing) : [];
    teachers.push(teacher);
    await AsyncStorage.setItem('teachers', JSON.stringify(teachers));
  } catch (error) {
    console.error('Error saving teacher:', error);
  }
};

// Get teachers
const getTeachers = async () => {
  try {
    const data = await AsyncStorage.getItem('teachers');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting teachers:', error);
    return [];
  }
};
```

### Using SQLite (Better):
```javascript
// Initialize
const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS teachers (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT,
        subjects TEXT,
        rating REAL,
        verified INTEGER
      )
    `);
  });
};

// Save teacher
const saveTeacher = (teacher) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT OR REPLACE INTO teachers (id, name, email, phone, subjects, rating, verified) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        teacher.id,
        teacher.name,
        teacher.email,
        teacher.phone,
        JSON.stringify(teacher.subjects),
        teacher.rating,
        teacher.verified ? 1 : 0
      ]
    );
  });
};

// Get teachers with filter
const getTeachers = (filters, callback) => {
  let query = 'SELECT * FROM teachers WHERE 1=1';
  const params = [];
  
  if (filters.verified) {
    query += ' AND verified = 1';
  }
  if (filters.minRating) {
    query += ' AND rating >= ?';
    params.push(filters.minRating);
  }
  
  db.transaction(tx => {
    tx.executeSql(
      query,
      params,
      (tx, results) => {
        const teachers = [];
        for (let i = 0; i < results.rows.length; i++) {
          const row = results.rows.item(i);
          teachers.push({
            ...row,
            subjects: JSON.parse(row.subjects),
            verified: row.verified === 1
          });
        }
        callback(teachers);
      }
    );
  });
};
```

---

## 🚀 Quick Start Guide

### For Simple Apps:
1. Install AsyncStorage
2. Replace localStorage calls
3. Done!

### For Production Apps:
1. Choose SQLite or Realm
2. Design database schema
3. Create migration scripts
4. Implement CRUD operations
5. Add error handling

---

**Note**: Current project uses React (web) with localStorage. For React Native, you'll need to replace localStorage with one of these options.
