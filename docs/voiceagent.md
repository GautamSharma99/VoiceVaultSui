# PRD — Voice Agent Deployment Platform (/deploy)

## Product Name

**VoiceVault Deploy**

### Tagline

**Own Your Voice. Deploy Your Agent. Earn Forever.**

Built using LiveKit Agents as the realtime voice runtime.

LiveKit Agents is built for realtime programmable voice agents that can hear, speak, and understand, and supports deployment to LiveKit Cloud and production-grade voice AI pipelines. ([GitHub][1])

---

# Problem Statement

Today creators can clone voices.

That is not enough.

They cannot:

* deploy autonomous voice agents
* monetize those agents continuously
* control ownership of deployed voices
* enforce licensing + royalties
* track usage + revenue transparently

Current voice AI tools focus on inference.

They do not solve ownership.

VoiceVault solves:

## programmable ownership infrastructure for voice agents

where creators deploy agents that work 24/7 and generate revenue on-chain.

---

# Goal

Enable users to:

## Create → Configure → Deploy → Monetize Voice Agents

directly from:

# `/deploy`

without needing to manually write LiveKit code.

The platform should generate deployable agents powered by LiveKit Agents runtime.

---

# Core Use Cases

### 1. AI Sales Agent

Outbound sales calls using creator’s voice

---

### 2. Customer Support Agent

Inbound support + FAQs + booking

---

### 3. Creator Clone Agent

Fans talk to creator’s AI version

---

### 4. Tutor Agent

Educational voice tutor

---

### 5. Podcast Host Agent

Autonomous podcast / content agent

---

# Product Scope (MVP)

Build only:

## Voice Upload + Agent Deploy + Pay-per-Use + Revenue Split

Do NOT build:

* enterprise dashboards
* advanced analytics
* team collaboration
* full CRM integrations
* telephony scale infra

Hackathon MVP only.

---

# Page

# `/deploy`

This becomes the main platform page.

---

# User Flow

```text
Upload Voice
↓
Register Voice NFT
↓
Create Agent Config
↓
Deploy via LiveKit
↓
User talks to agent
↓
Payment happens
↓
Revenue split on-chain
↓
Dashboard shows earnings
```

---

# Functional Requirements

---

# 1. Voice Selection Module

## User should be able to:

* upload new voice
* choose existing owned voice
* preview voice
* verify ownership

### Inputs

```json
{
  "voice_id": "voice_123",
  "model_uri": "walrus://abc123",
  "preview_url": "..."
}
```

### Validation

* must be owner of voice
* must be registered on-chain

---

# 2. Agent Template Selection

## Prebuilt templates

### Supported

* Sales Agent
* Support Agent
* Tutor Agent
* Creator Clone
* Custom Agent

Each template provides:

* default prompt
* tool presets
* pricing presets

---

# 3. Agent Configuration Builder

## User Configurable Fields

```json
{
  "agent_name": "",
  "agent_type": "",
  "persona": "",
  "system_prompt": "",
  "voice_model_uri": "",
  "llm_provider": "",
  "tools": [],
  "pricing": {
    "per_call": 0,
    "per_minute": 0
  }
}
```

---

## Fields

### Basic

* Agent Name
* Agent Description
* Persona
* Tone
* Industry

### AI Brain

* LLM Provider

  * OpenAI
  * Claude
  * Groq
  * Gemini

### Tools

* Calendar
* CRM
* Stripe
* Email
* Notion
* Custom API

### Pricing

* Per Call
* Per Minute
* Subscription

---

# 4. LiveKit Deployment Engine

Use:

LiveKit

via:

[LiveKit Agents GitHub](https://github.com/livekit/agents?utm_source=chatgpt.com)

and starter architecture from their Python starter templates. ([GitHub][2])

---

## Backend Responsibilities

### Generate

```python
agent.py
```

dynamically from AgentConfig

### Create

```python
AgentSession()
Agent()
WorkerOptions()
```

using LiveKit runtime patterns ([GitHub][3])

### Inject

* creator voice
* prompt
* tools
* payment middleware

### Deploy

to:

* LiveKit Cloud
* Docker deployment
* self-hosted deployment

---

# 5. Smart Contract Upgrade

Current:

```move
VoiceIdentity
```

Need:

# New

```move
AgentIdentity
```

---

## Move Struct

```move
public struct AgentIdentity has key, store {
   id: UID,
   owner: address,
   voice_id: ID,
   config_uri: String,
   pricing_model: u64,
   active: bool,
   created_at: u64
}
```

---

## Functions

### create_agent()

Create deployed agent object

---

### pause_agent()

Disable monetization

---

### delete_agent()

Deactivate deployment

---

### get_agent_metadata()

Fetch deploy info

---

# 6. Usage Billing Layer

When someone uses the agent:

```move
payment::pay_with_royalty_split()
```

should also emit:

```move
UsageEvent
```

---

## Event Structure

```move
public struct UsageEvent has copy, drop {
   agent_id: ID,
   user: address,
   duration: u64,
   payment: u64,
   timestamp: u64
}
```

---

# 7. Revenue Dashboard

Creator should see:

* total calls
* total revenue
* royalty earnings
* active agents
* top performing agents

---

# Technical Architecture

---

# High-Level

```text
Frontend (/deploy)
↓
FastAPI Agent Orchestrator
↓
Sui Smart Contracts
↓
Walrus Storage
↓
LiveKit Agents Runtime
↓
LLM + STT + TTS Providers
```

---

# Frontend

## Stack

* React
* TypeScript
* Vite
* Tailwind
* shadcn/ui

---

# Backend

## Stack

* FastAPI
* LiveKit Agents Python SDK
* Redis (optional queue)
* Postgres (future)
* Docker deployment

---

# Blockchain

## Stack

* Sui Move

Modules:

* voice_identity
* payment
* agent_identity (new)

---

# Storage

## Stack

* Walrus

Stores:

* voice bundle
* agent config
* deployment metadata

---

# API Endpoints

---

# POST `/api/agent/create`

Create deployable agent config

---

# POST `/api/agent/deploy`

Deploy LiveKit agent runtime

---

# POST `/api/agent/pause`

Pause active deployment

---

# POST `/api/agent/delete`

Delete deployment

---

# GET `/api/agent/status`

Deployment health

---

# POST `/api/agent/usage`

Track usage event

---

# Example Deployment Payload

```json
{
  "agent_name": "Sales Agent",
  "voice_model_uri": "walrus://abc123",
  "system_prompt": "You are an elite SaaS closer",
  "llm_provider": "Claude",
  "tools": [
    "calendar",
    "crm",
    "email"
  ],
  "pricing": {
    "per_call": 1,
    "per_minute": 0.2
  }
}
```

---

# Non-Functional Requirements

---

# Performance

* first response latency < 2s
* deployment time < 30s
* payment verification < 1s

LiveKit is designed for realtime voice AI agents and deployment on cloud infrastructure. ([LiveKit Docs][4])

---

# Security

* wallet ownership verification
* payment verification before access
* rate limiting
* signed deployment access
* secure token generation

---

# Future Scope (NOT MVP)

* phone number deployment
* Twilio integration
* enterprise call center agents
* team workspaces
* agent marketplace
* SDK for external developers

---

# Success Metrics

### MVP Success

* successful voice upload
* successful agent deployment
* successful first call
* successful on-chain payment split
* successful revenue dashboard update

---

# Final Pitch

## VoiceVault

### We are not building voice cloning.

### We are building programmable voice ownership infrastructure for autonomous AI agents.

That is the product.

That is the story.

That wins.

[1]: https://github.com/livekit/agents?utm_source=chatgpt.com "livekit/agents: A framework for building realtime voice AI ..."
[2]: https://github.com/livekit-examples/agent-starter-python?utm_source=chatgpt.com "livekit-examples/agent-starter-python"
[3]: https://github.com/livekit/agents/blob/main/examples/voice_agents/basic_agent.py?utm_source=chatgpt.com "agents/examples/voice_agents/basic_agent.py at main"
[4]: https://docs.livekit.io/agents/?utm_source=chatgpt.com "Introduction | LiveKit Documentation"
