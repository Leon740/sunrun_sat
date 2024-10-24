# Back-end

## Data

### Data Tree

Sunrun -> Branches -> Manager; Employees; Saturdays;

```txt
Sunrun
  - Branch
    - Manager
    - Employees
    - Saturdays

Sunrun
  - NJ South
    - Jude Maynard
    - Employees
    - Saturdays
```

### Data Example

```json
{
  "67195c86dc38b6cb7a52ea0d": {
    "_id": "67195c86dc38b6cb7a52ea0d",
    "name": "NJ South",
    "saturdays": [
      {
        "name": "October 26",
        "date": "2024-10-26",
        "employees": []
      },
      {
        "name": "November 2",
        "date": "2024-11-2",
        "employees": [
          "67195e1edc38b6cb7a52ea1d",
          "67195e2bdc38b6cb7a52ea20",
          "67195e36dc38b6cb7a52ea23",
          "67195e40dc38b6cb7a52ea26",
          "67195e52dc38b6cb7a52ea29",
          "67195e6adc38b6cb7a52ea2f"
        ]
      },
      {
        "name": "November 9",
        "date": "2024-11-9",
        "employees": []
      },
      {
        "name": "November 16",
        "date": "2024-11-16",
        "employees": []
      }
    ],
    "employees": {
      "67195d1adc38b6cb7a52ea17": {
        "firstname": "Jude",
        "lastname": "Maynard",
        "nickname": "Jude",
        "branchName": "NJ South",
        "branchId": "67195c86dc38b6cb7a52ea0d",
        "crew": "NJ South",
        "position": "Manager",
        "employeeId": "24WET8MZ1",
        "_id": "67195d1adc38b6cb7a52ea17"
      },
      "67195e52dc38b6cb7a52ea29": {
        "firstname": "Leonid",
        "lastname": "Dobrinov",
        "nickname": "Leo",
        "branchName": "NJ South",
        "branchId": "67195c86dc38b6cb7a52ea0d",
        "crew": "Crimpmin ain't easy",
        "position": "Lead",
        "employeeId": "463301",
        "_id": "67195e52dc38b6cb7a52ea29"
      }
    }
  }
}
```

### Data Interfaces

```ts
export interface IEmployee {
  _id: string;
  firstname: string;
  lastname: string;
  nickname: string;
  branchId: string;
  branchName: string;
  crew: string;
  position: 'Manager' | 'Foreman' | 'Lead' | 'Installer' | 'Electrician';
  employeeId: string;
}

export interface ISaturday {
  name: string;
  date: string;
  employees: IEmployee['_id'][];
}

export interface IBranch {
  _id: string;
  name: string;
  employees: {
    [key: IEmployee['_id']]: IEmployee;
  };
  saturdays: ISaturday[];
}
```

### Data Auto Initial Setup

Data should be fetched automatically using Workday API. <br />
At this point I don't have access to Workday API, instructions below show how to add initial data manually.

### Data Manual Initial Setup

#### 1_createBranch

Post https://sunrun-sat-back.onrender.com/api/branches/

```json
{
  "name": "NJ South"
}
```

!['1_createBranch'](./docs/back-end/initial/1_createBranch.png)

#### 2_createManager

Post https://sunrun-sat-back.onrender.com/api/branches/67195af5dc38b6cb7a52ea05/employee

```json
{
  "firstname": "Jude",
  "lastname": "Maynard",
  "nickname": "Jude",
  "crew": "NJ South",
  "position": "Manager",
  "employeeId": "24WET8MZ1"
}
```

!['2_createManager'](./docs/back-end/initial/2_createManager.png)

### 4_nextSteps

Once the Branch and Manager is created, the initial data setup is completed. From this point Manager can manage employees.

### Data Operations (Branch)

#### 1_createBranch

Post https://sunrun-sat-back.onrender.com/api/branches/

```json
{
  "name": "NJ South"
}
```

!['1_createBranch'](./docs/back-end/operations/branch/1_createBranch.png)

#### 2_readBranch

Get https://sunrun-sat-back.onrender.com/api/branches/67195af5dc38b6cb7a52ea05

!['2_readBranch'](./docs/back-end/operations/branch/2_readBranch.png)

#### 3_updateBranch

Put https://sunrun-sat-back.onrender.com/api/branches/67195af5dc38b6cb7a52ea05

!['3_updateBranch'](./docs/back-end/operations/branch/3_updateBranch.png)

#### 4_deleteBranch

Delete https://sunrun-sat-back.onrender.com/api/branches/67195af5dc38b6cb7a52ea05

!['4_deleteBranch'](./docs/back-end/operations/branch/4_deleteBranch.png)

#### 5_getAllBranchesFull

Get https://sunrun-sat-back.onrender.com/api/branches/full

!['5_getAllBranchesFull'](./docs/back-end/operations/branch/5_getAllBranchesFull.png)

#### 6_getAllBranchesShort

Get https://sunrun-sat-back.onrender.com/api/branches/short

!['6_getAllBranchesShort'](./docs/back-end/operations/branch/6_getAllBranchesShort.png)

### Data Operations (Employee)

#### 1_createEmployee

Post https://sunrun-sat-back.onrender.com/api/branches/67195c86dc38b6cb7a52ea0d/employee

!['1_createEmployee'](./docs/back-end/operations/employee/1_createEmployee.png)

#### 2_readEmployee_signIn

Get https://sunrun-sat-back.onrender.com/api/branches/67195c86dc38b6cb7a52ea0d/employee/67195f30dc38b6cb7a52ea3e

!['2_readEmployee_signIn'](./docs/back-end/operations/employee/2_readEmployee_signIn.png)

#### 3_updateEmployee

Put https://sunrun-sat-back.onrender.com/api/branches/67195c86dc38b6cb7a52ea0d/employee/67195f30dc38b6cb7a52ea3e

!['3_updateEmployee'](./docs/back-end/operations/employee/3_updateEmployee.png)

#### 4_deleteEmployee

Delete https://sunrun-sat-back.onrender.com/api/branches/67195c86dc38b6cb7a52ea0d/employee/67195f30dc38b6cb7a52ea3e

!['4_deleteEmployee'](./docs/back-end/operations/employee/4_deleteEmployee.png)

#### 5_readAllEmployees

Get https://sunrun-sat-back.onrender.com/api/branches/67195c86dc38b6cb7a52ea0d/allEmployees

!['5_readAllEmployees'](./docs/back-end/operations/employee/5_readAllEmployees.png)

#### 6_updateAllEmployees

Put https://sunrun-sat-back.onrender.com/api/branches/67195c86dc38b6cb7a52ea0d/allEmployees

!['6_updateAllEmployees'](./docs/back-end/operations/employee/6_updateAllEmployees.png)

### Data Operations (Saturday)

#### 1_readSaturdays

Get https://sunrun-sat-back.onrender.com/api/branches/67195c86dc38b6cb7a52ea0d/saturdays

!['1_readSaturdays'](./docs/back-end/operations/saturday/1_readSaturdays.png)

#### 2_updateSaturdays

Put https://sunrun-sat-back.onrender.com/api/branches/67195c86dc38b6cb7a52ea0d/saturdays

!['2_updateSaturdays'](./docs/back-end/operations/saturday/2_updateSaturdays.png)

### Data Testing

Postman <br />
Url: https://sunrun-sat-back.onrender.com/api/branches

### Data APIs Routes

branchRoutes.ts

```ts
// branch
router.get('/full', getAllBranchesFull);
router.get('/short', getAllBranchesShort);

router.post('/', createBranch);
router.get('/:id', readBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

// employee
router.post('/:id/employee', createEmployee);
router.get('/:id/employee/:employeeId', readEmployee);
router.put('/:id/employee/:employeeId', updateEmployee);
router.delete('/:id/employee/:employeeId', deleteEmployee);

router.get('/:id/allEmployees', readAllEmployees);
router.put('/:id/allEmployees', updateAllEmployees);

// saturday
router.get('/:id/saturdays', readSaturdays);
router.put('/:id/saturdays', updateSaturdays);
```

# Front-end

## 0_Testing

- Manager credentials:
  - Branch: NJ South,
  - EmployeeId: 67195d1adc38b6cb7a52ea17
- Employee credentials:
  - Branch: NJ South,
  - EmployeeId: 67195e52dc38b6cb7a52ea29

## 1_SignIn

/signIn

!['1_SignIn'](./docs/front-end/1_SignIn.png)

## 2_InstallerProfile

/profile

!['2_InstallerProfile'](./docs/front-end/2_InstallerProfile.png)

## 3_InstallerCalendar

/calendar

!['3_InstallerCalendar'](./docs/front-end/3_InstallerCalendar.png)

## 4_ManagerProfile

/profile

!['4_ManagerProfile'](./docs/front-end/4_ManagerProfile.png)

## 5_ManagerEditInstaller

/employeeId

!['5_ManagerEditInstaller'](./docs/front-end/5_ManagerEditInstaller.png)

## 6_ManagerCalendar

/calendar

!['6_ManagerCalendar'](./docs/front-end/6_ManagerCalendar.png)

# Design

## 1_SignIn

/signIn

!['1_SignIn'](./docs/design/1_SignIn.png)

## 2_InstallerProfile

/profile

!['2_InstallerProfile'](./docs/design/2_InstallerProfile.png)

## 3_InstallerCalendar

/calendar

!['3_InstallerCalendar'](./docs/design/3_InstallerCalendar.png)

## 4_ManagerProfile

/profile

!['4_ManagerProfile_1'](./docs/design/4_ManagerProfile_1.png)
!['4_ManagerProfile_2'](./docs/design/4_ManagerProfile_2.png)
!['4_ManagerProfile_3'](./docs/design/4_ManagerProfile_3.png)

## 5_ManagerEditInstaller

/employeeId

!['5_ManagerEditInstaller'](./docs/design/5_ManagerEditInstaller.png)

## 6_ManagerCalendar

/calendar

!['6_ManagerCalendar'](./docs/design/6_ManagerCalendar.png)
