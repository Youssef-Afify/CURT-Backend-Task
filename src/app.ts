import express, { Express } from "express";

export function createApp(): Express {
    const app = express();

    return app;
}