# Spirometry Test

## Probe:
As part of the process that receives readings we want to implement the function **storeReading(value, created_at, patient_id)** that has the following business requirements:

- Readings have to be stored in order of created_at
- Duplicate readings (same created_at) have to be discarded
- If value is +10% of average readings for the past month then store it and add a flag to manually review it by a respiratory therapist

## **Requirements**

- You can use any in memory data structure for the storage.
- We do most of our coding in JS/Typescript but you can use any language
- Code should be tested
- Code should compile and/or run
- Code should be structured as a production-ready application and not a single file

Assumptions:
I assume to do not allow to save old dates than the last entry to avoid duplicate reading

to run the tests:

`npm run test`

to run the application:

``npm run start``

It would open a little API Restfull with a POST endpoint:

``http://localhost:3000/spirometry/data``

with body:

```json
{
"value": <number>,
"created_at": "<dateFormat as 2022-06-28 15:00:00>",
"patient_id": <number>
}
```
