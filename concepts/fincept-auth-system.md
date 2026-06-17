---
title: Fincept Auth System
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [architecture, security, authentication, qt6]
sources: [raw/articles/fincept-terminal-v4-source-study.md]
---

# Fincept Auth System (JWT + MFA + PIN)

## Overview

Fincept Terminal 的认证系统包含多层安全: JWT 登录、OTP/MFA 验证、PIN 锁屏、会话恢复、设备 ID 生成。13 个源文件，模块清晰。

## Components

### AuthManager (状态机核心)
```cpp
class AuthManager : public QObject {
    static AuthManager& instance();

    // Auth flows
    void login(email, password, force_login = false);
    void signup(username, email, password, phone, country);
    void verify_otp(email, otp);
    void verify_mfa(email, otp);
    void forgot_password(email);
    void reset_password(email, otp, new_password);
    void logout();

    // Session
    void initialize();
    void refresh_user_data();
    void attempt_session_recovery(cb);
    bool needs_pin_setup() const;

    signals:
    void auth_state_changed();
    void login_succeeded() / login_failed() / login_mfa_required();
    void pin_setup_required();
    void terminal_unlocked();
    void session_expired();
};
```

### Auth Flow

```
App Start
    │
    ▼
AuthManager::initialize()
    ├── 尝试会话恢复 (saved JWT token)
    │   ├── token 有效 → fetch_user_profile → fetch_user_subscription → complete
    │   └── token 无效 → 显示登录界面
    │
    ▼
login(email, password)
    ├── 成功 → check needs_pin_setup → 完成
    ├── 需要 MFA → login_mfa_required → verify_mfa → 完成
    └── 已有活跃会话 → login_active_session → force_login 或拒绝
```

### PIN System

- **PinManager**: 管理 PIN 设置/验证
- PIN 在登录后、首次使用时设置
- **InactivityGuard**: 超时后自动锁定
- **SessionGuard**: 会话级安全守卫
- `pin_gate_cleared_` flag: 防止同一会话重复锁屏

### AuthApi

- RESTful API 调用
- JWT token 获取和刷新
- OTP/MFA 验证
- 设备 ID 生成和注册

### UserApi

- 用户 Profile 获取
- 订阅信息获取
- 密码重置

### AuthTypes

```cpp
struct SessionData {
    bool authenticated = false;
    QString jwt_token;
    QString user_id;
    QString email;
    // ... other fields
};
```

## Security Features

1. **JWT Token**: 无状态认证，服务端验证
2. **MFA (TOTP)**: 双因素认证
3. **PIN Lock**: 本地二次验证
4. **Inactivity Guard**: 超时自动锁定
5. **Device ID**: 设备指纹，多设备管理
6. **SecureStorage**: API keys 加密存储 (见 [[fincept-storage-system]])
7. **Session Recovery**: 优雅处理 token 过期

## UI Integration

- `auth_stack_` (QStackedWidget): Login / Register / Forgot Password / Pricing
- `lock_screen_`: PIN 输入界面
- `on_auth_state_changed()`: 认证状态切换 UI 可见性
- `set_shell_visible()`: 未认证时隐藏工具栏/状态栏

## Related
- [[fincept-terminal-architecture]]
- [[fincept-storage-system]]
