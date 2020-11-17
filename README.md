# Zendesk Ticket Viewer Web App

## Installing

To install all dependencies use

```bash
$ npm install
```

## How to run the App

### 1. Authorization

Copy the sample environment variable file

```bash
$ cp .env_sample .env
```

Edit the `.env` file and add your Zendesk username and password.

### 2. Run command

To launch the App in a browser use

```bash
$ npm run dev
```

## Testing

To test the business logic functions use

```bash
$ npm run test
```

To verify the Zendesk API requests use

```bash
$ npm run testApi
```
