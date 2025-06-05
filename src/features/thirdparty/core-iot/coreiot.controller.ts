import { Request, Response } from 'express';
import { coreIOTService } from './coreiot.service';
import { success } from '../../../utils/response';

class CoreIOTController {
    callRPC = async (req: Request<any, any, { deviceID: string, callType: 'oneway' | 'twoway', rpcRequest: { method: string, params: any }, accessToken: string }>, res: Response) => {
        try {
            await coreIOTService.callRPC(req.body)
            res.json(success({}, "Call RPC successfully"))
        } catch (error) {
            throw error
        }
    }
    getTelemetry = async (req: Request<any, any, any, { accessToken: string, keys: string, deviceID: string }>, res: Response) => {
        try {
            const result = await coreIOTService.getTelemetry(req.query)
            res.json(success(result, "Get Telemetry successfully"))
        } catch (error) {
            throw error
        }
    }
    getAttribute = async (req: Request<any, any, any, { deviceAccessToken: string, accessToken: string, sharedKeys?: string, clientKeys?: string }>, res: Response) => {
        try {
            const result = await coreIOTService.getAttribute(req.query)
            res.json(success(result, "Get Attribute successfully"))
        } catch (error) {
            throw error
        }
    }
    setAttribute = async (req: Request<any, any, { key: string, value: string }, { deviceID: string, accessToken: string }>, res: Response) => {
        try {
            const result = await coreIOTService.sendAttribute({
                ...req.query, ...req.body
            })
            res.json(success(result, "Set Attribute successfully"))
        } catch (error) {
            throw error
        }
    }
}
export const coreIOTController = new CoreIOTController(); 