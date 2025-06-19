import "@testing-library/jest-dom";
import { beforeAll, vi } from "vitest";

// WXT browser API のモック
const mockBrowser = {
	runtime: {
		getURL: vi.fn((path: string) => `chrome-extension://test/${path}`),
	},
	storage: {
		local: {
			clear: vi.fn().mockResolvedValue(undefined),
			get: vi.fn().mockResolvedValue({}),
			remove: vi.fn().mockResolvedValue(undefined),
			set: vi.fn().mockResolvedValue(undefined),
		},
	},
};

// WXT storageのモック
vi.mock("#imports", () => ({
	storage: {
		defineItem: vi.fn(() => ({
			getValue: vi.fn(),
			removeValue: vi.fn(),
			setValue: vi.fn(),
			watch: vi.fn(),
		})),
	},
}));

// グローバルにブラウザAPIをモック
beforeAll(() => {
	global.browser = mockBrowser;
	global.chrome = mockBrowser;
});
